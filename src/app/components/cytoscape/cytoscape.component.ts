import { Component, ElementRef, OnInit } from '@angular/core';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import { HttpClient } from '@angular/common/http';
import oneGraph from '../../jsonFiles/config1.json';
import bigGraph from '../../jsonFiles/config2.json';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
    selector: 'app-cytoscape',
    templateUrl: './cytoscape.component.html',
    styleUrls: ['./cytoscape.component.less'],
})
export class CytoscapeComponent implements OnInit {

    private cy: any;
    public id: number = Date.now();
    public selectBlock: any = undefined;
    public drawMode: boolean = false;
    public typeBlock: string = '';
    public openModal: boolean = false;
    public selectedColor: string = '';

    constructor(
        private el: ElementRef,
        private _router: Router,
        private _route: ActivatedRoute,
    ) { }

    public ngOnInit() {
        const id = this._route.snapshot.params['id'];

        cytoscape.use( edgehandles );

        this.cy = cytoscape({
            container: this.el.nativeElement.querySelector('#cy'),

            elements: [],
            style: [],
        });

        // обращаемся к пользовательскому интерфесу для работы с узлами
        let eh = this.cy.edgehandles();
        let graphConfig;

        if (Number(id) === 1) {
            graphConfig = oneGraph;
        } else {
            graphConfig = bigGraph;
        }


        graphConfig.elements.nodes.forEach(el => {
            this.cy.add({
                group: 'nodes',
                data: el.data,
                position: el.position,
            });
        })

        graphConfig.elements.edges.forEach(el => {
            this.cy.add({
                group: 'edges',
                data: el.data,
                position: el.position,
            });
        })

        this.cy.style(graphConfig.style);



        this.el.nativeElement.querySelector('#draw-on').addEventListener('click', () => {
            eh.enableDrawMode();
        });

        this.el.nativeElement.querySelector('#draw-off').addEventListener('click', function () {
            eh.disableDrawMode();
        });

        this.cy.on('click', 'node', (evt: any) => {
            this.previewSelect(evt);
        });

        this.cy.on('dblclick', 'edge', (evt: any) => {
            this.removeSelected(evt);
            this.closePreview();
        });

        this.el.nativeElement.addEventListener('dragstart', (event: any) => {
            this.typeBlock = event.target.id;
        });

        this.el.nativeElement.addEventListener('dragover', (event: any) => {
            event.preventDefault();
        });

        this.el.nativeElement.addEventListener('drop', (event: any) => {
            event.preventDefault();
            console.log(event)
            const rect = this.el.nativeElement.getBoundingClientRect();
            const pos = {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top
            };
            this.addNode(pos.x, pos.y, `${this.id += 1}`, {
                    name: 'Nikita',
                    date: Date.now().toString(),
                },
                this.typeBlock,
            );
        });
    }

    public previewSelect(evt: any) {
        this.selectBlock = evt;
        // console.log(this.selectBlock.target['_private'].data.type);
    }

    public closePreview() {
        this.selectBlock = undefined;
    }

    public selectColor(color: string) {
        this.selectedColor = color;

        return color;
    }

    public saveNewStyle() {
        let id = this.selectBlock.target['_private'].data.id;

        switch (this.selectedColor) {

            case 'yellow':

                if (!this.cy.style().json().find((el: any) => el.selector === '.yellow')) {
                    this.cy.style()
                        .selector(`.yellow`)
                        .style({
                            'background-color': 'yellow',
                        }).update();
                }

                this.cy.getElementById(id).addClass('yellow');
                break;

            case 'green':
                if (!this.cy.style().json().find((el: any) => el.selector === '.green')) {
                    this.cy.style()
                        .selector(`.green`)
                        .style({
                            'background-color': 'green',
                        }).update();
                }

                this.cy.getElementById(id).addClass('green');

                break;
        }


        this.openModal = false;
    }

    public saveGraph() {
        console.log( this.cy.json() );
    }

    public removeSelected(evt: any) {
            evt.target.toggleClass('selected');
            this.cy.$('.selected').remove();
            this.closePreview();
    }

    public addNode(x: number, y: number, label: string, info: any, type: string) {
        this.cy.add({
            group: 'nodes',
            data: {
                id: this.id,
                type: type,
                info: info,
                label: label,
            },
            position: {x: x, y: y},
        });
    }
}
