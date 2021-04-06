window.onload = function()
{
  /*Place Your Javascript Below This Line*/
  var IMAGE_SRC = "https://drive.google.com/uc?export=view&id="+ parent.id;
  var RIGHT_VALUE = "שחצן";
  var LEFT_VALUE = "מופנם";
// var RIGHT_VALUE = "ביבי";
// var LEFT_VALUE = "חכם";
  
  function mySliderFunction(paper, addLabel, inputX, inputY, pathString, colour, pathWidth) {
    var slider = paper.set();
    
    slider.currentValue = 50; // setting the initial value of the slider
    slider.push(paper.path("M" + inputX + " " + inputY + pathString)).attr({stroke:colour,"stroke-width": pathWidth});
    slider.PathLength   = slider[0].getTotalLength();

    slider.PathPointOne = slider[0].getPointAtLength(0); // left edge of slider
    slider.PathPointTwo = slider[0].getPointAtLength(slider.PathLength);  // right edge of slider; depends on the pathString that's input.
    slider.PathBox      = slider[0].getBBox();
    slider.PathBoxWidth = slider.PathBox.width;
    slider.push(paper.circle(slider.PathPointOne.x, slider.PathPointOne.y, pathWidth/2).attr({fill:colour, "stroke-width": 0,"stroke-opacity": 0})); // left edge
    slider.push(paper.circle(slider.PathPointTwo.x, slider.PathPointTwo.y, pathWidth/2).attr({fill:colour, "stroke-width": 0,"stroke-opacity": 0})); // right edge
	midSlider = canvas.rect(inputX+150,inputY-10,2,20,0).attr({fill: colour});  // draws the middle of the slider
	
    /*Slider Button*/
    // creating the "back" of the slider button, sButtonBack
    //    paper.circle(  x position,   y position,   radius of circle   )
    //  so the initial x position is in the center of the slider
    //  the .attr() call is to change the fill color, stroke width, and other graphical attributes
    slider.sButtonBack = paper.circle(slider.PathPointOne.x + slider.PathLength/2, slider.PathPointOne.y, pathWidth);
    slider.sButtonBack.attr({fill: "#777","stroke-width": 1,"fill-opacity": 1, stroke: "#000", r:(15)});
    slider.push(slider.sButtonBack); // drawing sButtonBack on the canvas  

    if(addLabel) {
    // adding a text label to the slider handle (i.e. number from 0 to 100)
      sliderText=paper.text((slider.PathPointOne.x + slider.PathPointTwo.x)/2, slider.PathPointOne.y, slider.currentValue).attr({fill:'#FFF', 'font-size':16, 'stroke-width':0 });
      slider.push(sliderText);
    }
    // similarly creating the slider button itself.
    slider.sButton = paper.circle(slider.PathPointOne.x + slider.PathLength/2, slider.PathPointOne.y, pathWidth);
    slider.sButton.attr({fill: "#777","stroke-width": 1,"fill-opacity": 0.1, stroke: "#000", r:(15)} );
    
    slider.push(slider.sButton); // draw sButton onto the canvas.
    return slider;
  };
  
  function moveSlider(slider, addLabel, inputX) {    
    // We also want to add other attributes/functionality to the sButton
    var start = function () { this.ox = this.attr("cx"); },
    move = function (dx, dy) {
      proportionAlongLine = (this.ox + dx - inputX)/slider.PathBoxWidth;
      // reusing "PathPointOne" to store current point
      slider.PathPointOne = slider[0].getPointAtLength(proportionAlongLine * slider.PathLength);

      if (!slider.PathPointOne.x) { slider.PathPointOne.x=x1; }
      if (!slider.PathPointOne.y) { slider.PathPointOne.y=y1; }
      this.attr({cx: slider.PathPointOne.x, cy: slider.PathPointOne.y}); 
      slider.sButtonBack.attr({cx: slider.PathPointOne.x, cy: slider.PathPointOne.y});

      // just adding a check so that the "cx" doesnt go beyond the left edge.
      if (Math.round(((this.attr("cx")-slider.PathBox.x)/slider.PathBox.width)*100)) {
        slider.currentValue=Math.round(((this.attr("cx")-slider.PathBox.x)/slider.PathBox.width)*100);  
      } else {
        slider.currentValue=0;
      }
      if(addLabel) { // adding an label to the slider handle
        sliderText.attr({text:slider.currentValue, x: slider.PathPointOne.x, y: slider.PathPointOne.y});
      }
    },
    up = function () {
      // 
    }; 
    // assign the 'move', 'start', and 'up' functions to the slider button
    //   see raphael.js documentation for more details, but the inputs are:
    //   1) what to do when element is moved ("mouse move")
    //   2) what to do on the start of the element being dragged ("mouse start")
    //   3) what to do when the element is released ("mouse up")
    slider.sButton.drag(move, start, up);
  };
  
  var image;
  // loading the video into the html element
  image = document.getElementById("face_im");
  image.setAttribute("src", IMAGE_SRC);
  
  // creating the canvas onto which to paint the slider
  canvas = Raphael('tag_slider'); 


  LeftEdge = 40;
  RightEdge = 340;
  textYCoord = 40;
  var BTN_Y = 155
var BTN_TXT = "להמשך"
  // creating the end points of the slider
  canvas.text(LeftEdge, textYCoord,"רע").attr({ "font-size": 18,"fill":"white" });
  canvas.text(RightEdge, textYCoord, "טוב").attr({ "font-size": 18,"fill":"white"});
  
  canvas.text(LeftEdge, textYCoord+65,"טיפש").attr({ "font-size": 18,"fill":"white" });
  canvas.text(RightEdge, textYCoord+65, "חכם").attr({ "font-size": 18,"fill":"white"});
  
  canvas.text(LeftEdge+400, textYCoord,"מופנם").attr({ "font-size": 18,"fill":"white" });
  canvas.text(RightEdge+400, textYCoord, "מוחצן").attr({ "font-size": 18,"fill":"white"});
  
  canvas.text(LeftEdge+400, textYCoord+65,"קמצן").attr({ "font-size": 18,"fill":"white" });
  canvas.text(RightEdge+400, textYCoord+65, "נדיב").attr({ "font-size": 18,"fill":"white"});
  
  // creating the slider variable  

  goodBad = mySliderFunction(canvas, false, LeftEdge, 75, 'h300',"#AAAAAA", 15);
  dumSmart = mySliderFunction(canvas, false, LeftEdge, 135, 'h300',"#AAAAAA", 15);
  introExtro = mySliderFunction(canvas, false, LeftEdge+400, 75, 'h300',"#AAAAAA", 15);
  chipGen = mySliderFunction(canvas, false, LeftEdge+400, 135, 'h300',"#AAAAAA", 15);
  var group = canvas.set();
  var submitBtn = canvas.rect(340,BTN_Y,100,40).attr({fill: "green"});
  var lbl = canvas.text(390,BTN_Y+20,BTN_TXT).attr({ "font-size": 22,"fill":"black" });
  group.push(submitBtn);
  group.push(lbl)
  moveSlider(goodBad, false, LeftEdge);
  moveSlider(dumSmart,false,LeftEdge);
  moveSlider(introExtro,false,LeftEdge+400);
  moveSlider(chipGen,false,LeftEdge+400);
  group.click(function(){
      parent.addData("badGood",goodBad.currentValue);
      parent.addData("dumSmart",dumSmart.currentValue);
      parent.addData("introExtro",introExtro.currentValue);
      parent.addData("chipGen",chipGen.currentValue);
      parent.finishHTML();
    
  })
  


  
};