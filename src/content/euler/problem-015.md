---
problemNumber: 15
title: "Lattice Paths"
description: "Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner. How many such routes are there through a 20×20 grid? Answer: 137846528820"
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=15
      // Lattice paths
      
      // Starting in the top left corner of a 2×2 grid,
      // and only being able to move to the right and down,
      // there are exactly 6 routes to the bottom right corner.
      //
      // How many such routes are there through a 20×20 grid?
      
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
      // https://projecteuler.net/problem=15
      //
      // Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner.
      //
      // How many such routes are there through a 20×20 grid?
      //
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

## Additional Notes

This is Project Euler problem 15: Lattice Paths.

Starting in the top left corner of a 2×2 grid, and only being able to move to the right and down, there are exactly 6 routes to the bottom right corner. How many such routes are there through a 20×20 grid? Answer: 137846528820
