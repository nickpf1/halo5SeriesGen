$( document ).ready(function() {

    var mapObj = JSON.parse(haloMapsWithTypes);

    //Generate 5 series
    $("#generate_5").click({param1: "5"}, generateSeries);
    $("#generate_7").click({param1: "7"}, generateSeries);

    //Fills in the maps div to display the random
    function generateSeries(event){
         var seriesToGen= event.data.param1;
         buildSeriesHtml(seriesToGen,generateRandomMapGametypeArray(seriesToGen));
    }

    //todo: create validation so back to back map/gametype combo is not happening.
    function buildSeriesHtml(numOfSeries, generatedArray){
        //empty div that holds all the maps
        $('#maps').empty();

        for(var i = 0; i < numOfSeries; i++)
        {
            var id = (i+1);

            var mapId = generatedArray[0][i];
            var gtId = generatedArray[1][i];

            //generate random map from JSON
            var mapName = mapObj.mapz[mapId].name;
            var gameType = mapObj.mapz[mapId].gameTypes[gtId];
            var mapGen = mapName + " " + gameType;

            $('#maps').append(
            '<div class="polaroid">' +
                '<div class="gameTitle"> Game ' + id + ' </div>'+
                '<img id="img' + id + '" src="imgs/'+ mapObj.mapz[mapId].img + '" alt="">'+
                '<div id="series' +id + '" class="container">'+
                mapGen+
                '</div>'+
             '</div>');
        }
    }

    function generateRandomMapGametypeArray(size)
    {
       var results = [];
       var mapArray = [];
       var gtArray = [];

       do
       {
            var mapId = Math.floor(Math.random()* mapObj.mapz.length);
            var gtId = Math.floor(Math.random() * mapObj.mapz[mapId].gameTypes.length);

            //add when not in map array
            if($.inArray(mapId,mapArray) === -1)
            {
                mapArray.push(mapId);
                gtArray.push(gtId);
            }

       }while(mapArray.length < size);

       results[0] = mapArray;
       results[1] = gtArray;

       return results;
    }

});