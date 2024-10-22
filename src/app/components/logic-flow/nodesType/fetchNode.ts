import { RectNode, RectNodeModel, h } from "@logicflow/core";

class fetchNode extends RectNode {
    getIcon () {
        const {
            width,
            height,
        } = this.props.model;
        return h('image', {
            width: 30,
            height: 30,
            x: - width / 2,
            y: - height / 2,
            href: 'components/logic-flow/images/fetch.svg'
        });
    }
}

class fetchNodeModel extends RectNodeModel {
    override setAttributes() {
        this.width = 200;
        this.height = 80;
        this.radius = 0;
    }
}

export default {
    type: 'fetch-node',
    model: fetchNodeModel,
    view: fetchNode
}
