---
problemNumber: 15
title: "Lattice Paths"
description: |
  Starting in the top left corner of a $2 \times 2$ grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.

  How many such routes are there through a $20 \times 20$ grid?
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // Answer: 137846528820
      
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
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << lattice_path(2) << std::endl;
        std::cout << "Answer: " << lattice_path(20) << std::endl;
        return 0;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler015.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.math.BigInteger;
      
      public class Solution015 implements Solution {
        public String solve() {
          // C(40, 20) = 40! / (20! * 20!)
          return binomialCoefficient(40, 20).toString();
        }
      
        private BigInteger binomialCoefficient(int n, int k) {
          BigInteger result = BigInteger.ONE;
          for (int i = 1; i <= k; i++) {
            result = result.multiply(BigInteger.valueOf(n - i + 1));
            result = result.divide(BigInteger.valueOf(i));
          }
          return result;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution015.java"
  - language: "javascript"
    code: |
      function factorial(n) {
        let result = 1n;
        for (let i = 2n; i <= n; i++) {
          result *= i;
        }
        return result;
      }
      
      module.exports = {
        answer: () => {
          // C(40, 20) = 40! / (20! * 20!)
          const n = 40n;
          const k = 20n;
          return factorial(n) / (factorial(k) * factorial(n - k));
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution015.js"
  - language: "python"
    code: |
      def solve():
          """
          Lattice paths
          Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down,
          there are exactly 6 routes to the bottom right corner.
          How many such routes are there through a 20×20 grid?
          """
          from math import comb
          return comb(40, 20)
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler015.py"
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
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler015.rb"
  - language: "go"
    code: |
      package main
      
      import (
      
          "fmt"
      
          "math/big"
      
      )
      
      func binomial(n, k int64) *big.Int {
      
          if k > n-k {
      
              k = n - k
      
          }
      
          res := big.NewInt(1)
      
          for i := int64(1); i <= k; i++ {
      
              res.Mul(res, big.NewInt(n-i+1))
      
              res.Div(res, big.NewInt(i))
      
          }
      
          return res
      
      }
      
      func main() {
      
          fmt.Println(binomial(40, 20))
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler015.go"
  - language: "rust"
    code: |
      // Answer: 137846528820
      
      pub fn lattice_paths(grid_size: u32) -> u128 {
          let n = 2 * grid_size;
          let k = grid_size;
          let mut result = 1u128;
          for i in 1..=k as u128 {
              result *= n as u128 - i + 1;
              result /= i;
          }
          result
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_015() {
              assert_eq!(lattice_paths(2), 6);
              assert_eq!(lattice_paths(20), 137_846_528_820);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler015.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This is a classic combinatorics problem. To navigate an n×n grid with only right and down moves, you need exactly n right moves and n down moves, for a total of 2n moves.

The number of paths is the number of ways to arrange n right moves and n down moves, which is given by the binomial coefficient:

$\binom{2n}{n} = \frac{(2n)!}{(n!)^2}$

For a 20×20 grid, this becomes $\binom{40}{20}$, which is the number shown in the solutions.

### Algorithm Analysis

Most implementations use direct binomial coefficient calculation rather than dynamic programming to avoid overflow and precision issues with large factorials.

- **Direct factorial approach**: Compute (2n)! / (n! * n!) but requires big integer arithmetic
- **Iterative multiplication**: Compute the coefficient by multiplying terms iteratively to avoid computing full factorials
- **Dynamic programming**: Build a grid where each cell represents paths to that point (shown in C++ and Ruby implementations)

Time complexity: O(n) for iterative binomial calculation, O(n²) for dynamic programming grid approach.

### Performance Analysis

- **Time Complexity**: O(n) for iterative binomial coefficient calculation (n=20 multiplications), O(n²) for DP grid approach.
- **Space Complexity**: O(1) for iterative method, O(n²) for DP grid (400 cells for 20×20).
- **Execution Time**: Virtually instantaneous for both approaches, suitable for real-time computation.
- **Scalability**: Iterative method scales better for larger grids, DP approach becomes memory-intensive.

### Key Insights

- The problem requires exactly n right and n down moves in some order
- Binomial coefficients grow extremely rapidly - C(40,20) is over 137 trillion
- Dynamic programming approach demonstrates the concept of optimal substructure
- The iterative binomial calculation is more memory-efficient than factorial computation

### Educational Value

This problem teaches:
- Fundamental combinatorics and counting principles
- Binomial coefficients and their interpretation
- Dynamic programming for path counting problems
- The importance of choosing appropriate data types for large numbers
- How mathematical insight can replace brute-force enumeration

### Key Insights

- The problem requires exactly n right and n down moves in some order
- Binomial coefficients grow extremely rapidly - C(40,20) is over 137 trillion
- Dynamic programming approach demonstrates the concept of optimal substructure
- The iterative binomial calculation is more memory-efficient than factorial computation

### Educational Value

This problem teaches:
- Fundamental combinatorics and counting principles
- Binomial coefficients and their interpretation
- Dynamic programming for path counting problems
- The importance of choosing appropriate data types for large numbers
- How mathematical insight can replace brute-force enumeration
