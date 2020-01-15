class Paint {
    constructor() {
        this.canvas = document.getElementById('board');
        this.canvas.width = 800;
        this.canvas.height = 500;
        this.ctx = this.canvas.getContext('2d');
        this.color = '#ff0000';
        this.tool = 'pen'; //cricle,rect,line
        this.lineWidth = 1;
        this.listenEven();
        this.currentPos = {
            x: 0,
            y: 0
        };
        this.startPos = {
            x: 0,
            y: 0
        };
        this.drawBackground();
        this.drawing = false;
        this.image = null;
    }

    getMousePos(evt) {
        var rect = this.canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    mousedown(event) {
        this.image = new Image;
        this.image.src = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        let mousePos = this.getMousePos(event);
        this.startPos = this.getMousePos(event);

        this.drawing = true;

    }

    mousemove(event) {
        let mousePos = this.getMousePos(event);
        if (this.drawing) {
            switch (this.tool) {
                case "pen":
                    this.drawLine(this.currentPos, mousePos);
                    break;
                case "line":
                    this.undo();
                    this.drawLine(this.startPos, mousePos);
                    break;
                case "rect":
                    this.undo();
                    this.drawRect(this.startPos, mousePos)
            }
        }
        this.currentPos = mousePos;
    }

    mouseup(event) {
        this.drawing = false;
    }

    drawBackground() {
        this.ctx.fillStyle = "#ffffff";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    listenEven() {
        this.canvas.addEventListener('mousedown', (event) => this.mousedown(event));
        this.canvas.addEventListener('mousemove', (event) => this.mousemove(event));
        this.canvas.addEventListener('mouseup', (event) => this.mouseup(event));

    }

    undo() {
        this.ctx.drawImage(this.image, 0, 0, this.canvas.width, this.canvas.height);
    }

    drawLine(startPos, endPos) {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.moveTo(startPos.x, startPos.y);
        this.ctx.lineTo(endPos.x, endPos.y);
        this.ctx.stroke();
    }

    drawRect(startPos, endPos) {
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.strokeStyle = this.color;
        this.ctx.beginPath();
        this.ctx.rect(
            startPos.x,
            startPos.y,
            endPos.x - startPos.x,
            endPos.y - startPos.y);
        this.ctx.stroke();
    }

}

var p = new Paint();