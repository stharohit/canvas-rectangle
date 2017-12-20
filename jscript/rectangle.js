window.onload = function () {
  var canvas = document.getElementById('canvas');
  var clear = document.getElementById('clear');
  var draw = canvas.getContext('2d');
  var obj = {x1:0,x2:0,x3:0,x4:0,y1:0,y2:0,y3:0,y4:0,l:0,b:0,cc:0};
  var shapes = [];

  clear.addEventListener("click",clearCanvas);
  canvas.addEventListener("mousedown",checkCanvas);
  canvas.addEventListener("dblclick",deleteShape);


  //On mouse down check if shape is detected and move it or else draw another shape
  function checkCanvas(event) {
    var sIndex = -1;
    var sDrag = false;
    var a = mx = event.clientX-canvas.offsetLeft;
    var b = my = event.clientY- canvas.offsetTop;
    if(shapes.length>0){
      for (var i = 0; i < shapes.length; i++) {
        var flag = calculateArea(i,mx,my);
        if (flag === true) {
          sIndex = i;
          sDrag = true;
        }
      }
    }
    if(sDrag == true) {
      canvas.onmousemove = function (event) {
        event.preventDefault();
        var cx = event.clientX - canvas.offsetLeft - a;
        var cy = event.clientY - canvas.offsetTop - b;
        moveRectangle(cx,cy,shapes,sIndex);
        a = event.clientX-canvas.offsetLeft;
        b = event.clientY-canvas.offsetTop;
      }
      canvas.onmouseup = function () {
        canvas.onmousemove = null;
        sDrag = false;
      }
    } else{
      var color = randomColorCode();
        canvas.onmousemove = function (event){
          event.preventDefault();
          var cx = event.clientX - canvas.offsetLeft;
          var cy = event.clientY - canvas.offsetTop;
          draw.clearRect(0,0,canvas.width,canvas.height);
          reDraw();
          drawRectangle(mx,my,cx,cy,color);
        }
      canvas.onmouseup = function (event) {
        canvas.onmousemove = null;
          if (event.clientX - canvas.offsetLeft != mx && event.clientY - canvas.offsetTop != my) {
            shapes.push(obj);
        }
      }
    }
  }


  function calculateArea(i,mx,my) {
    var s = shapes[i];
    a = Math.abs(s.l * s.b);
    a1 = Math.abs(triangleArea(mx,my,s.x1,s.y1,s.x2,s.y2));
    a2 = Math.abs(triangleArea(mx,my,s.x2,s.y2,s.x3,s.y3));
    a3 = Math.abs(triangleArea(mx,my,s.x3,s.y3,s.x4,s.y4));
    a4 = Math.abs(triangleArea(mx,my,s.x4,s.y4,s.x1,s.y1));
    var A = a1 + a2 + a3 + a4;
    console.log(A);
    console.log(a);
    if (a === A && A !== 0) {
      return true;
    }else {
      return false;
    }
  };

  function triangleArea(x1,y1,x2,y2,x3,y3) {
    return ((x1*(y2-y3)+x2*(y3-y1)+x3*(y1-y2))/2);
  };

  function drawRectangle(mx,my,cx,cy,color) {
    var length = cx - mx;
    var breadth = cy - my;
    obj = {x1:mx,x2:mx,x3:mx+length,x4:mx+length,y1:my,y2:my+breadth,y3:my+breadth,y4:my,l:length,b:breadth,cc:color};
    draw.fillStyle = color;
    draw.beginPath();
    draw.rect(obj.x1,obj.y1,obj.l,obj.b);
    draw.fill();
  };


  function moveRectangle(x,y,s,cv) {
    s[cv].x1 += x;
    s[cv].x2 += x;
    s[cv].x3 += x;
    s[cv].x4 += x;
    s[cv].y1 += y;
    s[cv].y2 += y;
    s[cv].y3 += y;
    s[cv].y4 += y;
    draw.clearRect(0,0,canvas.width,canvas.height);
    reDraw();
  }

  function randomColorCode() {
    var x = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return x;
  };

  function deleteShape(event) {
    var mx = event.clientX - canvas.offsetLeft;
    var my = event.clientY - canvas.offsetTop;
    var f = false;
    var index = null;
    if(shapes.length>0){
    for (var i = 0; i < shapes.length; i++) {
      var f = calculateArea(i,mx,my);
      if (f){
        index = i;
        }
      }
      if (index!=null) {
        shapes.splice(index,1);
        reDraw();
      }
    };
  };

  function reDraw() {
    draw.clearRect(0,0,canvas.width,canvas.height);
    if(shapes.length>0){
      for (var i = 0; i < shapes.length; i++) {
        var obj = shapes[i];
        draw.fillStyle = obj.cc;
        draw.beginPath();
        draw.rect(obj.x1,obj.y1,obj.l,obj.b);
        draw.fill();
      }
    }
  };


  function clearCanvas() {
    draw.clearRect(0,0,canvas.width,canvas.height);
    shapes = [];
  };
};
