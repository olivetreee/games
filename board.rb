class Board


  def initialize(size = 9)
    @grid = Array.new(size) do
      Array.new(size) do
        Tile.new([true, false].sample
      end
    end

    @size = size
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
