---
problemNumber: 15
title: "Lattice paths"
description: "Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner. How many such routes are there through a 20×20 grid?"
difficulty: "easy"
date: 2015-02-11
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <cstdint>

      uint64_t lattice_path(size_t grid_size)
      {
        std::vector< uint64_t > grid((grid_size+1)*(grid_size+1),1);

        for (int x = grid_size-1; 0 <= x ; x--) {
          for (int y = grid_size-1; 0 <= y; y--) {
            int pos = (y*(grid_size+1))+x;
            grid.at(pos) = grid.at(pos+1) + grid.at(pos+(grid_size+1));
          }
        }
        return grid.at(0);
      }

      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << lattice_path(20) << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler015.cpp"
    performance: "O(n²) time complexity for grid filling"
  - language: "ruby"
    code: |
      def lattice_paths(grid_size)
        grid_dimension = grid_size + 1
        grid = Array.new(grid_dimension * grid_dimension) { 1 }
        (grid_size - 1).downto(0) do |x|
          (grid_size - 1).downto(0) do |y|
            pos = (y * grid_dimension) + x
            grid[pos] = grid[pos + 1] + grid[pos + grid_dimension]
          end
        end
        grid[0]
      end

      puts lattice_paths(20) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler015.rb"
tags: ["euler", "lattice", "paths"]
featured: false
showcase: true
---

## Additional Notes

This problem counts the number of paths through a grid with only right and down moves. The solution uses dynamic programming to fill a grid where each cell represents the number of paths to that point. The result is equivalent to the binomial coefficient C(40,20) for a 20x20 grid.