import { CurvedEdge, CurvedEdgeModel } from '@logicflow/extension'

class myCurvedEdge extends CurvedEdge {
}

class myCurvedEdgeModel extends CurvedEdgeModel {
    override initEdgeData(data) {
        super.initEdgeData(data)
        this.radius = 5
    }

    override getEdgeStyle() {
        const style = super.getEdgeStyle()
        style.strokeWidth = 3
        style.stroke = 'rgb(130, 179, 102)'
        return style
    }

    override setAttributes() {
        this.isAnimation = true
    }

    override getEdgeAnimationStyle() {
        const style = super.getEdgeAnimationStyle()
        style.strokeDasharray = '15 5'
        style.animationDuration = '10s'
        style.stroke = 'rgb(130, 179, 102)'
        return style
    }
}
