Description:
Virtual ecosystem, a litle world populated with critters
that move around and struggle for survival.

Definition:
To make this task manageable, we will radically simplify the concept of a world. 
Namely, a world will be a two-dimensional grid where each entity takes up one 
full square of the grid. 
On every turn, the critters all get a chance to take some action.

Characters:
'#' - Represents walls and rocks
'o' - Represents critters
' ' - Represents empty space

Example of the world:
########
##  o  #
# o #  #
########

What I learned:
    - When calling the Array constructor with a single number as an argument, 
    it creates a new empty array of the given length.
    
    - We can use one-dimensional array of size width*height as two-dimensional array by 
    converting position indexing:
     (x,y) -> x + (y * width)