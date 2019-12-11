// Map between index and filename
var IsometricMap = {
  tiles: [
    // "img/dirt.png",
    "img/dirtHigh.png", 		// 0
    "img/grass.png",			// 1
    "img/water.png",			// 2
    "img/waterBeachCornerEast.png",	// 3
    "img/waterBeachCornerNorth.png",	// 4
    "img/waterBeachCornerSouth.png",	// 5
    "img/waterBeachCornerWest.png",	// 6
    "img/waterBeachEast.png",	// 7
    "img/waterBeachNorth.png",	// 8
    "img/waterBeachSouth.png",	// 9
    "img/waterBeachWest.png",	// 10
    "img/waterCornerEast.png",	// 11
    "img/waterCornerNorth.png",	// 12
    "img/waterCornerSouth.png",	// 13
    "img/waterCornerWest.png",	// 14
    "img/waterEast.png",		// 15
    "img/waterNorth.png",		// 16
    "img/waterSouth.png",		// 17
    "img/waterWest.png",		// 18
    "img/bridgeEast.png",		// 19
    "img/bridgeNorth.png",		// 20
    "img/crossroad.png",		// 21
    // "img/hillCornerEast.png",
    // "img/hillCornerNW.png",
    // "img/hillCornerSE.png",
    // "img/hillCornerWest.png",
    // "img/hillEast.png",
    // "img/hillNorth.png",
    // "img/hillRoadEast.png",
    // "img/hillRoadNorth.png",
    // "img/hillRoadSouth.png",
    // "img/hillRoadWest.png",
    // "img/hillSouth.png",
    // "img/hillWest.png",
    "img/lot.png",			// 22
    "img/lotCornerEast.png",		// 23
    "img/lotCornerNorth.png",	// 24
    "img/lotCornerSouth.png",	// 25
    "img/lotCornerWest.png",		// 26
    "img/lotEast.png",		// 27
    "img/lotExitEast.png",		// 28
    "img/lotExitNorth.png",		// 29
    "img/lotExitSouth.png",		// 30
    "img/lotExitWest.png",		// 31
    "img/lotNorth.png",		// 32
    "img/lotPark.png",		// 33
    "img/lotSouth.png",		// 34
    "img/lotWest.png",		// 35
    "img/roadCornerES.png",		// 36
    "img/roadCornerNE.png",		// 37
    "img/roadCornerNW.png",		// 38
    "img/roadCornerWS.png",		// 39
    "img/roadEast.png",		// 40
    "img/roadEndEast.png",		// 41
    "img/roadEndNorth.png",		// 42
    "img/roadEndSouth.png",		// 43
    "img/roadEndWest.png",		// 44
    "img/roadNorth.png",		// 45
    "img/roadTEast.png",		// 46
    "img/roadTNorth.png",		// 47
    "img/roadTSouth.png",		// 48
    "img/roadTWest.png", // 49
    "img/negocio.png"],		
  map: [
         [2, 2, 2, 2, 19, 2, 2, 2, 2, 2],
         [18, 18, 18, 18, 19, 18, 18, 18, 18, 18],
         [1, 0, 1, 0, 40, 0, 1, 0, 1, 0],
         [23, 35, 24, 1, 40, 1, 41, 1, 1, 1],
         [32, 33, 34, 1, 39, 46, 49, 45, 37, 1],
         [32, 33, 30, 45, 45, 49, 45, 45, 38, 1],
         [25, 28, 26, 36, 37, 1, 1, 1, 1, 1],
         [1, 48, 45, 38, 40, 1, 1, 3, 7, 7],
         [1, 40, 1, 1, 40, 1, 1, 9, 2, 2],
         [1, 40, 1, 1, 40, 1, 1, 5, 10, 10]
    ],
  buildings: [
    {name:'house',
    posX: 2,
    posY: 2,
    image: 50}
  ]
};
