Vec3 = function( x, y, z )
{
}

Vec3.prototype.min = function()
{
	min = (x < y) ? (x < z ? x : z) : (y < z ? y : z);
	document.write("min: ", min+"</br>");
}

Vec3.prototype.mid = function()
{
	mid = (x > y) ? (x < z ? x : z) : (y < z ? y : z);
	document.write("mid: ", mid+"</br>");
}

Vec3.prototype.max = function()
{
	max = (x > y) ? (x > z ? x : z) : (y > z ? y : z);
	document.write("max: ", max+"</br>");
}