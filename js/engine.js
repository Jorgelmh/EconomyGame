var Isometric = {
    tileColumnOffset: 100, // pixels
    tileRowOffset: 50, // pixels
  
    originX: 0, // offset from left
    originY: 0, // offset from top
  
    Xtiles: 0, // Number of tiles in X-dimension
    Ytiles: 0, // Number of tiles in Y-dimension
  
    selectedTileX: -1,
    selectedTileY: -1,

    app: null, // this will be the pixi app
    stage: null,
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  
    BB: null,
    offsetX: 0,
    offsetY: 0,
    startX: 0,
    startY: 0,
    dragging: false,

    draggingObject: false,

    gameLoaded: false,
  
    context: undefined,
    canvas: undefined,
  
    tileImages: undefined,
  
    showCoordinates: false,
  
    load: function() {
  
      // Load all the images before we run the app
      for(var i = 0; i < IsometricMap.tiles.length; i++) {
        PIXI.loader.add(IsometricMap.tiles[i]);
      } 
      PIXI.loader.load(this.run);

    },
  
    run: function() {

      var self = this.Isometric;

      self.stage  = new PIXI.Container;

      self.app = new PIXI.autoDetectRenderer({ 
        width: self.width, 
        height: self.height,                       
        antialias: true, 
        transparent: false, 
        resolution: 1, clearBeforeRender: true
      });


      this.canvas = self.app.view;
      document.body.appendChild(this.canvas);
      
      this.canvas.onmousedown = function(event){
        event.preventDefault();

        if(self.selectedTileX>= 0 && self.selectedTileX < self.Xtiles && self.selectedTileY >= 0 && self.selectedTileY < self.Ytiles){
          self.dragging = true;
          self.startX = parseInt(event.clientX - self.offsetX);
          self.startY = parseInt(event.clientY - self.offsetY);
        }
       
      };

      this.canvas.onmouseup = function(event){ //When unpressed
        event.preventDefault();
        self.dragging = false;
  
      };

      this.canvas.ontouchstart = self.onTouchStartDragMobile;
      this.canvas.ontouchmove = self.dragMapMobile;
      this.canvas.ontouchend = self.onTouchEndDragMobile;

      this.canvas.onmousemove = self.dragMap;
  
      //this.animate;

      self.Xtiles = IsometricMap.map.length;
      self.Ytiles = IsometricMap.map[0].length;
  
      /*
      $(window).on('resize', function(){
        self.updateCanvasSize();
        self.redrawTiles();
      });
      */
  
      
     $(window).on('mousemove', function(e) {
       //console.log(self.originX);

       console.log(e.pageX)
       e.pageX = e.pageX - self.tileColumnOffset / 2 - self.originX;
       e.pageY = e.pageY - self.tileRowOffset / 2 - self.originY;

       console.log(e.pageX)

       tileX = Math.round((e.pageX - 30) / self.tileColumnOffset - (e.pageY - 30) / self.tileRowOffset);
       tileY = Math.round((e.pageX - 30) / self.tileColumnOffset + (e.pageY - 30) / self.tileRowOffset);
  
       self.selectedTileX = tileX;
       self.selectedTileY = tileY;
      //  /self.drawMap();

       //self.drawDiamond(self.selectedTileX, self.selectedTileY, 'yellow');
  
       //console.log(self.selectedTileX + ", " + self.selectedTileY);
     });
  
     /*
      $(window).on('click', function(e) {
        self.showCoordinates = !self.showCoordinates;
        self.redrawTiles();
      });
      */
      //this.updateCanvasSize();

      /* Instantiating the automatic refresh of the canvas */
      
      requestAnimationFrame(animate);

      function animate(){
        requestAnimationFrame(animate);
        self.app.render(self.stage);
      }

      self.updateCanvasSize();
      self.drawMap();

      /* Setting the position after the map is loaded */
      self.originX = self.width / 2 - self.Xtiles * self.tileColumnOffset / 2;
      self.originY = self.height / 2;
      self.stage.x = self.originX;
      self.stage.y = self.originY;

    },
  
    updateCanvasSize: function() {
     // var width = $(window).width();
      //var height = $(window).height();
  /*
      this.context.canvas.width  = width;
      this.context.canvas.height = height;
  */
      //Temporary positions when initiazaling the game

      this.originX = 0; 
      this.originY = 0;
      this.stage.x = this.originX;
      this.stage.y = this.originY;
    },
  
    drawMap: function() {
      //this.context.canvas.width = this.context.canvas.width
      for(var Xi = (this.Xtiles - 1); Xi >= 0; Xi--) {
        for(var Yi = 0; Yi < this.Ytiles; Yi++) {
            this.drawTile(Xi, Yi); 
        }
      }
          
      for(var i = 0; i < IsometricMap.buildings.length; i++){
        this.drawBuildings(IsometricMap.buildings[i].posX, IsometricMap.buildings[i].posY, IsometricMap.tiles[IsometricMap.buildings[i].image], 100, 100);
      }
      
  
      this.gameLoaded = true;
      //this.drawDiamond(this.selectedTileX, this.selectedTileY, 'yellow');
      
      if(this.showCoordinates && this.isCursorOnMap()) {
        this.context.fillStyle = 'yellow';
        var idx = IsometricMap.map[this.selectedTileX][this.selectedTileY];
        this.context.font = '14pt Arial';
        this.context.fillText(IsometricMap.tiles[idx].replace("/assets/tiles/",""), 20, 30);
      }

    },
  
    isCursorOnMap: function() {
      return (this.selectedTileX >= 0 && this.selectedTileX < this.Xtiles &&
              this.selectedTileY >= 0 && this.selectedTileY < this.Ytiles);
    },
  
    drawTile: function(Xi, Yi) {
      var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2;
      var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2;
  
      var imageIndex = IsometricMap.map[Xi][Yi];

      var sprite = new PIXI.Sprite(PIXI.loader.resources[IsometricMap.tiles[imageIndex]].texture);
      sprite.x = offX;
      sprite.y = offY;

      this.stage.addChild(sprite);  
      //self.Isometric.stage.addChild(this.tileImages[imageIndex], offX, offY);
  
      if(this.showCoordinates) {
        this.context.fillStyle = 'orange';
        this.context.fillText(Xi + ", " + Yi, offX + this.tileColumnOffset/2 - 9, offY + this.tileRowOffset/2 + 3);
      }
    },
  
    drawBuildings: function(Xi, Yi, building, width, height){

      var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
      var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY - this.tileRowOffset;

      var sprite = new PIXI.Sprite(PIXI.loader.resources[building].texture);
      sprite.width = width;
      sprite.height = height;
      sprite.position.x = offX;
      sprite.position.y = offY;
      sprite.interactive = true;
      sprite.buttonMode = true;

      //Adding the event listeners for dragging the object in case needed
      
      sprite.on('mousedown' , this.onObjectPressed);
      sprite.on('touchstart', this.onObjectPressed);

      sprite.on('mouseup', this.onObjectUnpressed);
      sprite.on('touchend', this.onObjectUnpressed);

      sprite.on('mousemove', this.dragObject);
      sprite.on('touchmove', this.dragObjectMobile);


      this.stage.addChild(sprite)

      //self.stage.addChild(building, offX, offY, width, height);

  
    },

    drawDiamond: function(Xi, Yi, color) {
      var offX = Xi * this.tileColumnOffset / 2 + Yi * this.tileColumnOffset / 2 + this.originX;
      var offY = Yi * this.tileRowOffset / 2 - Xi * this.tileRowOffset / 2 + this.originY;
  
      this.drawLine(offX, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY, color);
      this.drawLine(offX + this.tileColumnOffset / 2, offY, offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, color);
      this.drawLine(offX + this.tileColumnOffset, offY + this.tileRowOffset / 2, offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, color);
      this.drawLine(offX + this.tileColumnOffset / 2, offY + this.tileRowOffset, offX, offY + this.tileRowOffset / 2, color);
    },
  
    drawLine: function(x1, y1, x2, y2, color) {

      let myGraph = new PIXI.Graphics();
      this.stage.addChild(myGraph);

      myGraph.lineStyle(1, 0x00FFFF)
       .moveTo(x1, y1)
       .lineTo(x2, y2);
    },

    animate: function(){
      this.app.render(this.stage);
    },

    //Functions related to entities movement

    /* GENERAL MAP DRAGGING FUNCTIONS */

    dragMap: function(e){

      e.preventDefault();
      if(self.Isometric.dragging && !self.Isometric.draggingObject){
  
        var mx = parseInt(e.clientX);
        var my = parseInt(e.clientY);
  
        self.Isometric.originX += mx - self.Isometric.startX;
        self.Isometric.originY += my - self.Isometric.startY;
  
        self.Isometric.startX = mx;
        self.Isometric.startY = my;

        self.Isometric.stage.x = self.Isometric.originX;
        self.Isometric.stage.y = self.Isometric.originY;

        //console.log(self.Isometric.stage.x + ',' + self.Isometric.stage.y)

      }
    },

    /* Drag MAP MOBILE DEVICES */

    onTouchStartDragMobile: function(e){
      let data = e.changedTouches[0];
      //let newPosition = this.data.getLocalPosition(this.parent);

      pageX = data.pageX - self.Isometric.tileColumnOffset/2 - self.Isometric.originX;
      pageY = data.pageY - self.Isometric.tileRowOffset/2 - self.Isometric.originY;

      let tileX = Math.round(pageX / self.Isometric.tileColumnOffset - pageY / self.Isometric.tileRowOffset);
      let tileY = Math.round(pageX / self.Isometric.tileColumnOffset + pageY / self.Isometric.tileRowOffset);

      if(tileX >= 0 && tileX < self.Isometric.Xtiles && tileY >= 0 && tileY < self.Isometric.Ytiles){
        self.Isometric.dragging = true;
        self.Isometric.startX = parseInt(data.clientX - self.Isometric.offsetX);
        self.Isometric.startY = parseInt(data.clientY - self.Isometric.offsetY);
      }

    },

    dragMapMobile: function(e){

      if(self.Isometric.dragging && !self.Isometric.draggingObject){
        
        var data = e.changedTouches[0];

        var mx = parseInt(data.clientX);
        var my = parseInt(data.clientY);
  
        self.Isometric.originX += mx - self.Isometric.startX;
        self.Isometric.originY += my - self.Isometric.startY;
  
        self.Isometric.startX = mx;
        self.Isometric.startY = my;

        self.Isometric.stage.x = self.Isometric.originX;
        self.Isometric.stage.y = self.Isometric.originY;

        //console.log(self.Isometric.stage.x + ',' + self.Isometric.stage.y)

      }
    },

    onTouchEndDragMobile: function(e){
      self.Isometric.dragging =false;
    },

    /* GENERAL OBJECT DRAGGING FUNCTIONS */

    dragObject: function(event){
      if(this.dragging){
        var x = self.Isometric.selectedTileX * self.Isometric.tileColumnOffset / 2 + self.Isometric.selectedTileY * self.Isometric.tileColumnOffset / 2;
        var y = self.Isometric.selectedTileY * self.Isometric.tileRowOffset / 2 - self.Isometric.selectedTileX * self.Isometric.tileRowOffset / 2;
        this.position.x = x;
        this.position.y = y; 

        //console.log(x + "," + y)

      }
    },

    dragObjectMobile: function(event){

      if (this.dragging)
      {
          var newPosition = this.data.getLocalPosition(this.parent);
          let tileX = Math.round((newPosition.x-50) / self.Isometric.tileColumnOffset - (newPosition.y - 50) / self.Isometric.tileRowOffset);
          let tileY = Math.round((newPosition.x-50) / self.Isometric.tileColumnOffset + (newPosition.y - 50) / self.Isometric.tileRowOffset);

          this.position.x = tileX * self.Isometric.tileColumnOffset / 2 + tileY * self.Isometric.tileColumnOffset / 2;
          this.position.y = tileY * self.Isometric.tileRowOffset / 2 - tileX * self.Isometric.tileRowOffset / 2;
          //console.log(tileX + "," + tileY)
      }
    },

    onObjectPressed: function(event){
      this.data = event.data;
      self.Isometric.draggingObject = true;
      this.alpha = 0.5;
      this.dragging = true;
    },

    onObjectUnpressed: function(event){
          this.alpha = 1;
      
          this.dragging = false;
          self.Isometric.draggingObject = false;

          this.data = null;
          // set the interaction data to null
    },

  };