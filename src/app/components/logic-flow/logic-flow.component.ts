import {Component, ElementRef, OnInit} from '@angular/core';
import LogicFlow from '@logicflow/core';
import {Menu, DndPanel, SelectionSelect, BpmnElement, Snapshot, MiniMap} from '@logicflow/extension'
import fetchNode from './nodesType/fetchNode'
import circleNode from "./nodesType/circleNode";
import fetchNodeSmall from "./nodesType/fetchNodeSmall";
import oneGraph from '../../jsonFiles/config-logicflow.json';

@Component({
    selector: 'app-logic-flow',
    templateUrl: './logic-flow.component.html',
    styleUrls: ['./logic-flow.component.less']
})
export class LogicFlowComponent implements OnInit {

    public dragRow: any;
    public randomValue: any;
    public openModal = false;
    public selectBlock: any = undefined;
    public personInf: any = {
        information: {
            name: '',
            age: '',
            city: '',
        }
    }
    public lf: any;
    public selectedColor: any = {
        style: {
            fill: 'white'
        }
    };
    public styleConfig  = [
        {
            style: {
                fill: 'rgb(255, 255, 255)',
                stroke: 'rgb(42, 42, 42)',
                strokeWidth: 2
            },
        },
        {
            style: {
                fill: 'rgb(245, 245, 245)',
                stroke: 'rgb(102, 102, 102)',
                strokeWidth: 2
            }
        },
        {
            style: {
                fill: 'rgb(218, 232, 252)',
                stroke: 'rgb(108, 142, 191)',
                strokeWidth: 2
            },
        },
        {
            style: {
                fill: 'rgb(213, 232, 212)',
                stroke: 'rgb(130, 179, 102)',
                strokeWidth: 2
            }

        },
        {
            style: {
                fill: 'rgb(248, 206, 204)',
                stroke: 'rgb(184, 84, 80)',
                strokeWidth: 2
            }
        }
    ];

    constructor(private el: ElementRef,) {
    }


    public baseNodes = [
        {
            type: 'fetch-node',
            text: 'Прямоугольник большой',
            background: 'bg-blue-50',
            icon: './assets/images/square.svg',
        },
        {
            type: 'fetch-node-small',
            text: 'Прямоугольник маленький',
            background: 'bg-blue-50',
            icon: './assets/images/square.svg'
        },
        {
            type: 'circle-node',
            text: 'круг',
            background: 'bg-blue-50',
            icon: './assets/images/circle.svg'
        },
        {
            type: 'diamond',
            text: 'ромб',
            // color: 'white',
            // background: 'blue',
            icon: './assets/images/diamond.svg'
        },
    ];

    public ngOnInit() {

        this.lf = new LogicFlow({
            background: {
                backgroundColor: "white",
            },
            container: document.querySelector('#container')!,
            // grid: true,
            plugins: [BpmnElement, Menu, Snapshot, MiniMap, DndPanel, SelectionSelect, Snapshot],
            pluginsOptions: {
                miniMap: {},
            },
        });

        this.lf.on('node:click', (data) => {
            console.log(data.data)
            this.selectBlock = data.data;
        })

        this.lf.extension.menu.setMenuConfig({
            nodeMenu: [
                {
                    className: "lf-menu-color custom-menu",
                    text: "Изменить цвет",
                    icon: true,
                    callback: (node: any) => {
                        // console.log(node)
                        this.selectBlock = node;
                        if (node.properties.style) {
                            this.selectedColor = node.properties
                        }
                        this.openModal = true;
                    }
                },
                {
                    className: "lf-menu-delete custom-menu",
                    text: "Удалить блок",
                    icon: true,
                    callback: (node: any) => {
                        this.lf.deleteNode(node.id);
                    }
                },
            ],
            edgeMenu: [
                {
                    text: "тест меню связи",
                    callback(edge: any) {
                        alert(`
          id：${edge.id}
          тип линии：${edge.type}
          координаты：(x: ${edge.x}, y: ${edge.y})
          sourceNodeId：${edge.sourceNodeId}
          targetNodeId：${edge.targetNodeId}`);
                    }
                }
            ],
            graphMenu: [
                {
                    text: 'руддщ',
                    callback() {
                        alert('руддщ！')
                    },
                },
            ],
        });

        this.lf.register(fetchNode);
        this.lf.register(circleNode);
        this.lf.register(fetchNodeSmall);
        this.lf.render(oneGraph);

        this.lf.setDefaultEdgeType('bezier');
    }

    public downloadScreen() {
        this.lf.extension.snapshot.customCssRules = `
    .lf-canvas-overlay {
      background: #EEF5FF;
    }`;

        this.lf.getSnapshot();
    }

    public mouseDown(data: any) {
        this.dragRow = data;
        this.randomValue = Math.floor(Math.random() * Date.now()).toString(36);

        this.lf.dnd.startDrag({
            type: data.type,
            text: data.text,
            id: this.randomValue,
        });
    }

    public closePreview() {
        this.selectBlock = undefined;
    }

    public resetGraph() {
        this.lf.resetZoom();
        this.lf.resetTranslate();
    }

    public saveInf() {
        this.lf.setProperties(this.selectBlock.id, this.personInf);
        this.personInf = {
            information: {
                name: '',
                age: '',
                city: '',
            }
        }
    }

    public exportJson() {
        console.log(this.lf.getGraphData())
    }

    public selectColor(color: any) {
        this.selectedColor = color;
    }

    public saveNewStyle() {

        this.lf.setProperties(this.selectBlock.id, this.selectedColor);
        this.openModal = false;
        this.selectedColor = {
            style: {
                fill: 'white'
            }
        }
    }

}
