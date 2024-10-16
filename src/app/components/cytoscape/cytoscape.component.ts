import { Component, ElementRef, OnInit } from '@angular/core';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';


@Component({
    selector: 'app-cytoscape',
    templateUrl: './cytoscape.component.html',
    styleUrls: ['./cytoscape.component.less']
})
export class CytoscapeComponent implements OnInit {

    private cy: any;
    public id: number = 100;
    public selectBlock: any = undefined;
    public drawMode: boolean = false;
    public typeBlock: string = '';

    constructor(private el: ElementRef) { }

    public ngOnInit() {
        cytoscape.use( edgehandles );

        this.cy = cytoscape({
            container: this.el.nativeElement.querySelector('#cy'),

            elements: [],

            style: [
                {
                    selector: 'node[type = "triangle"]',
                    style: {
                        'shape': 'rectangle',
                        'width': '200px',
                        'height': '100px',
                        'background-color': '#ffffff',
                        'label': 'data(label)',
                        'border-color': '#333',
                        'border-width': '2px',
                        'text-valign': 'center',
                        'text-wrap': 'wrap',
                        'text-max-width': '140px',
                        'text-halign': 'center',
                    }
                },
                {
                    selector: 'node[type = "hexagon"]',
                    style: {
                        'shape': 'hexagon',
                        'width': '200px',
                        'height': '100px',
                        'background-color': '#ffffff',
                        'label': 'data(label)',
                        'border-color': '#333',
                        'border-width': '2px',
                        'text-valign': 'center',
                        'text-wrap': 'wrap',
                        'text-max-width': '140px',
                        'text-halign': 'center',
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'curve-style': 'bezier',
                        'target-arrow-shape': 'triangle'
                    },
                },
                {
                    selector: '.eh-hover',
                    style: {
                        'background-color': 'blue'
                    }
                },

                {
                    selector: '.eh-source',
                    style: {
                        'border-width': 2,
                        'border-color': 'blue'
                    }
                },

                {
                    selector: '.eh-target',
                    style: {
                        'border-width': 2,
                        'border-color': 'blue'
                    }
                },

                {
                    selector: '.eh-preview, .eh-ghost-edge',
                    style: {
                        'background-color': 'blue',
                        'line-color': 'blue',
                        'color': 'white',
                        'target-arrow-color': 'blue',
                        'source-arrow-color': 'blue',
                    }
                },

                {
                    selector: '.eh-ghost-edge.eh-preview-active',
                    style: {
                        'opacity': 0
                    }
                }
            ],

            layout: {
                name: 'grid',
            }
        });

        // обращаемся к пользовательскому интерфесу для работы с узлами
        let eh = this.cy.edgehandles();

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
    }

    public closePreview() {
        this.selectBlock = undefined;
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

        // this.cy.layout({ name: 'grid' }).run(); // Перераскладка после добавления узла
    }
}
