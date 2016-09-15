require_relative 'tile'

class Board

  def initialize(size = 9)
    @grid = Array.new(size) do
      Array.new(size) { Tile.new([true, false].sample) }
    end
    @size = size
  end

  def print_row_number(row)
    print (row) < 10 ? " #{row}" : "#{row}"
  end

  def print_columns_number
   line = ["  "]
   @size.times do |num|
     extra_space = (num+1) < 10 ? " " : ""
     line << "#{extra_space}#{num+1}"
   end
   puts line.join("  ")
  end

  def find_neighbors
    
  end

  def render
    print_columns_number
    @grid.each_with_index do |row,row_num|
      line = [""]
      row.each_index do |column_num|
        position = [row_num,column_num]
        if self[position].bomb
          line << "B"
        else
          line << "n"
        end
      end
      line << ""
      print_row_number(row_num+1)
      puts line.join(" | ")
    end
  end

  def [](pos)
    x,y = pos
    @grid[x][y]
  end

  def []= (pos, new_value)
    x,y = pos
    @grid[x][y] = new_value
  end

end
