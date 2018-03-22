window.requestAnimFrame = (function() {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function(callback) {
                window.setTimeout(callback, 1000 / 60);
            };
    })();


    (function() {
        var canvas = document.getElementById('canvas');
        
        canvas.setAttribute("width", window.innerWidth);
        canvas.setAttribute("height", window.innerHeight);

        var center = {
            x: canvas.width / 2,
            y: canvas.height / 2,
            
        }

        var ctx = null;
        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
        } else {
            alert("Seu browser nao suporta Canvas HTML5!");
            return;
        }

        
        function drawArc(cx, cy, r, grd, line_color, linewidth) {
            ctx.fillStyle = grd;
            ctx.strokeStyle = line_color;

            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, 2 * Math.PI);
            ctx.lineWidth = linewidth;
            
            ctx.stroke();
            ctx.fill();
        }

        function clear() {
            ctx.fillStyle = "#07091A";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        function gen_r() {
            const rs = [30, 50, 80];
            var rdn = Math.random();
            if (rdn < 0.33) return rs[0];
            if (rdn < 0.66) return rs[1];
            return rs[2];
        }

        // ####### # # #  WAVE # # # #####################
        var waves_group = [];
        function Wave(x, color) {
            var defaultRadius = x || 30;
            this.cx = canvas.width / 2;
            this.cy = canvas.height / 2;
            var borderColor = color || "#105893";
            this.radius = defaultRadius;
            var delta = 5;

            this.updateCenters = function(){
                this.cx = canvas.width / 2;
                this.cy = canvas.height / 2;
            }
            
            this.draw = function(m) {
                /*
                var grd = ctx.createRadialGradient(cx, cy, this.radius - delta, cx, cy, this.radius + delta);
                grd.addColorStop(0, "#070D21");
                if(m/6 < this.radius){
                    grd.addColorStop(1, "#070D21");
                    borderColor = "#083166";
                }else{
                    grd.addColorStop(1, "#105893");
                    borderColor = "#105893";
                }
                                    grd.addColorStop(1, "#105893");
                    borderColor = "#105893";
                drawArc(cx, cy, this.radius, grd, borderColor, 5, false);
                
                */
                //console.log(c)
                drawArc(center.x, center.y, this.radius, null, borderColor, 5, false);
            }

            this.procedure = function() {
                var m = Math.min(canvas.height, canvas.width);
                if (this.radius > m / 3) {
                    this.radius = defaultRadius;
                    waves_group.push(this);
                    waves_group = waves_group.slice(1, waves_group.length);
                } else {
                    this.radius += 0.2;
                }
                this.draw(m);
            }

        }

        
        
        
        function draw() {
            clear();
            var m = Math.min(canvas.height, canvas.width);
            drawArc(center.x, center.y, m/3, null, "#093166", 5);
            waves_group.map(function(o) {
                o.procedure();
            });
            //console.log(center.x, center.y);
        
            var grd_center = ctx.createRadialGradient(center.x, center.y, 10, center.x, center.y, 30);
            grd_center.addColorStop(0, "#093166");
            grd_center.addColorStop(1, "#175F9F");
            drawArc(center.x, center.y, 30, grd_center, "#105893", 5);
        }

        
        // ################33#####  ANIMATION  ##################################
        
        function loop() {
            draw();
            requestAnimFrame(loop);
        }

        function init() {
            var count = 4;
            
            var wave_elem = new Wave(30);
            waves_group.push(wave_elem);
            
            var thr = 40;
            draw();

            var color = null;
            function createWavesElements() {
                if (waves_group[0].radius >= thr * 1.2) {
                    count--;
                    thr = waves_group[0].radius + gen_r();
                    if(count % 2 != 0) color = "#093166";
                    //console.log(count)
                    wave_elem = new Wave(30, color);
                    color = null;   
                    waves_group.push(wave_elem);
                }
                draw();
                if (count) requestAnimFrame(createWavesElements);
                else {
                    requestAnimFrame(loop);
                }
            }
            requestAnimFrame(createWavesElements);
        }
        init();
        
        window.onresize = function(){
            canvas.setAttribute("width", window.innerWidth);
            canvas.setAttribute("height", window.innerHeight);
            center.x = canvas.width / 2;
            center.y = canvas.height / 2;
            waves_group.map(function(o){
                o.updateCenters();
            })
            console.log("hey");
        }
        // ###################################################################
    })();