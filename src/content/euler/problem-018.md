---
problemNumber: 18
title: "Maximum path sum I"
description: |
  By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.

  Find the maximum total from top to bottom of the triangle below.

  NOTE: As there are only \(2^{14}\) routes, it is possible to solve this problem by trying every route. However, Problem 67, is the same challenge with a triangle containing one-hundred rows; it cannot be solved by brute force, and requires a clever method!
difficulty: "easy"
date: 2015-02-16
technologies: ["cpp", "ruby"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>

      int maximum_path_sum_1()
      {
        std::vector<std::vector<int>> triangle = {
          {75},
          {95, 64},
          {17, 47, 82},
          {18, 35, 87, 10},
          {20, 4, 82, 47, 65},
          {19, 1, 23, 75, 3, 34},
          {88, 2, 77, 73, 7, 63, 67},
          {99, 65, 4, 28, 6, 16, 70, 92},
          {41, 41, 26, 56, 83, 40, 80, 70, 33},
          {41, 48, 72, 33, 47, 32, 37, 16, 94, 29},
          {53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14},
          {70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57},
          {91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48},
          {63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31},
          {4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23}
        };

        for (int i = triangle.size() - 1; i > 0; --i) {
          for (size_t j = 0; j < triangle[i].size() - 1; j++) {
            triangle[i - 1][j] += std::max(triangle[i][j], triangle[i][j + 1]);
          }
        }

        return triangle[0][0];
      }

      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << maximum_path_sum_1() << std::endl;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler018.cpp"
    performance: "O(n²) time complexity for triangle processing"
  - language: "ruby"
    code: |
      def maximum_path_sum_one
        triangle = [
          [75],
          [95, 64],
          [17, 47, 82],
          [18, 35, 87, 10],
          [20, 4, 82, 47, 65],
          [19, 1, 23, 75, 3, 34],
          [88, 2, 77, 73, 7, 63, 67],
          [99, 65, 4, 28, 6, 16, 70, 92],
          [41, 41, 26, 56, 83, 40, 80, 70, 33],
          [41, 48, 72, 33, 47, 32, 37, 16, 94, 29],
          [53, 71, 44, 65, 25, 43, 91, 52, 97, 51, 14],
          [70, 11, 33, 28, 77, 73, 17, 78, 39, 68, 17, 57],
          [91, 71, 52, 38, 17, 14, 91, 43, 58, 50, 27, 29, 48],
          [63, 66, 4, 68, 89, 53, 67, 30, 73, 16, 69, 87, 40, 31],
          [4, 62, 98, 27, 23, 9, 70, 98, 73, 93, 38, 53, 60, 4, 23]
        ]

        (triangle.size - 2).downto(0) do |i|
          (0..triangle[i].size - 1).each do |j|
            triangle[i][j] += [triangle[i + 1][j], triangle[i + 1][j + 1]].max
          end
        end

        triangle[0][0]
      end

      puts maximum_path_sum_one if __FILE__ == $PROGRAM_NAME
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler018.rb"
tags: ["euler", "path", "triangle"]
featured: false
showcase: true
---

## Additional Notes

This problem requires finding the maximum path sum through a 15-row triangle of numbers, moving only to adjacent numbers below. Both solutions use dynamic programming, working from the bottom up to compute the maximum path sum to each position. This approach is efficient and prepares for the larger Problem 67.