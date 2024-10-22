import { RectNode, RectNodeModel } from "@logicflow/core";

class circleNode extends RectNode {
}

class circleNodeModel extends RectNodeModel {
    override setAttributes() {
        this.width = 80;
        this.height = 80;
        this.radius = 50;
        this.color = 'red';
        // this.text.editable = false;
        this.inputData = this.text.value
    }

    override getOutlineStyle() {
        const style = super.getOutlineStyle();
        style.color = 'red';
        return style;
    }
}

export default {
    type: 'circle-node',
    model: circleNodeModel,
    view: circleNode
}
