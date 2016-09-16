class Tile

attr_reader :bomb
attr_accessor :value, :show, :flag

  def initialize(bomb)
    @bomb = bomb
    @flag = false
    @show = false
    @value = 0
  end



end
