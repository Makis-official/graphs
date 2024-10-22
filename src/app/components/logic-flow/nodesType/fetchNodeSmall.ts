import { RectNode, RectNodeModel } from "@logicflow/core";

class fetchNodeSmall extends RectNode {
}

class fetchNodeModelSmall extends RectNodeModel {
    override setAttributes() {
        this.width = 100;
        this.height = 40;
        this.radius = 0;
    }
}

export default {
    type: 'fetch-node-small',
    model: fetchNodeModelSmall,
    view: fetchNodeSmall
}
