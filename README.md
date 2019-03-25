Project Title
-------------

[TimeHole][ll] -- 25 Mar 2019

[ll]: https://kschmarr.github.io/timehole/


Summary
-------

When the user lands on the front page they are presented with a 
choice to GO OUT or STAY IN. 
<img src="ssMain.png" alt="Screenshot of front page of TimeHole site" width="30%">

For this project only the GO OUT option 
is fleshed out. The user clicks on either half of the screen and is 
taken to the page for that option. Once on the GO OUT page they are 
presented with a text input asking for a city where they want to go 
climbing. 
<img src="ssSearch.png" alt="Screenshot of search page on TimeHole site" width="30%">

When this input is submitted the Accuweather API returns 
the most popular city matching the input text, it uses this location 
to get the 1 day forecast for that location. It also uses the 
lat/lon from that location to get route data from the Mountain 
Project API. That response is filtered to display only routes with 
more than 4 stars within a 20 mile radius of the search location.
<img src="ssResult.png" alt="Screenshot of results on TimeHole site" width="30%">


Technology Used
---------------

HTML/CSS/JavaScript/jQuery


Thanks
------

For the use of their wonderful APIs:
[Accuweather][aw]
[Mountain Project][mp]

[aw]: https://developer.accuweather.com/
[mp]: https://www.mountainproject.com/data