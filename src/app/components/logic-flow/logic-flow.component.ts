import {Component, OnInit} from '@angular/core';
import LogicFlow from '@logicflow/core';

@Component({
  selector: 'app-logic-flow',
  templateUrl: './logic-flow.component.html',
  styleUrls: ['./logic-flow.component.less']
})
export class LogicFlowComponent implements OnInit{

  public ngOnInit() {
    const data: any = {
      // 节点
      nodes: [
        {
          id: 21,
          type: 'rect',
          x: 100,
          y: 200,
          text: {
            value: '矩形节点',
            x: 100,
            y: 200,
          },
        },
        {
          id: 50,
          type: 'circle',
          x: 300,
          y: 400,
          text: {
            value: '圆形节点',
            x: 300,
            y: 400,
          },
        },
      ],
      // 边
      edges: [
        {
          type: 'polyline',
          sourceNodeId: 50,
          targetNodeId: 21,
        },
      ],
    };
// 渲染画布
    const lf = new LogicFlow({
      container: document.querySelector('#container')!,
      width: 700,
      height: 600,
      grid: true
    });

    lf.render(data);
  }
}
