---
problemNumber: 28
title: "Number Spiral Diagonals"
description: |
  Starting with the number $1$ and moving to the right in a clockwise direction a $5$ by $5$ spiral is formed as follows:

  | 21 | 22 | 23 | 24 | 25 |
  |----|----|----|----|----|
  | 20 |  7 |  8 |  9 | 10 |
  | 19 |  6 |  1 |  2 | 11 |
  | 18 |  5 |  4 |  3 | 12 |
  | 17 | 16 | 15 | 14 | 13 |

  It can be verified that the sum of the numbers on the diagonals is $101$.

  What is the sum of the numbers on the diagonals in a $1001$ by $1001$ spiral formed in the same way?
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=28
      
      // Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral is formed as follows:
      //
      // 21 22 23 24 25
      // 20  7  8  9 10
      // 19  6  1  2 11
      // 18  5  4  3 12
      // 17 16 15 14 13
      //
      // It can be verified that the sum of the numbers on the diagonals is 101.
      //
      // What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?
      //
      // Answer: 669171001
      
      #include <iostream>
      
      long long spiral_diagonal_sum(int size) {
          if (size == 1) return 1;
          long long sum = 1;  // center
          for (int n = 3; n <= size; n += 2) {
              // corners: n², n²-n+1, n²-2n+2, n²-3n+3
              long long corner1 = (long long)n * n;
              long long corner2 = corner1 - (n - 1);
              long long corner3 = corner2 - (n - 1);
              long long corner4 = corner3 - (n - 1);
              sum += corner1 + corner2 + corner3 + corner4;
          }
          return sum;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << spiral_diagonal_sum(1001) << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler028.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution028 implements Solution {
        public String solve() {
          long sum = 1;
          long num = 1;
      
          for (int step = 2; step <= 1001; step += 2) {
            for (int corner = 0; corner < 4; corner++) {
              num += step;
              sum += num;
            }
          }
      
          return Long.toString(sum);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution028.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          let sum = 1;
          let num = 1;
      
          for (let step = 2; step <= 1001; step += 2) {
            for (let corner = 0; corner < 4; corner++) {
              num += step;
              sum += num;
            }
          }
      
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution028.js"
  - language: "python"
    code: |
      def solve():
          """
          Number spiral diagonals
          Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5 spiral
          is formed. The sum of the numbers on the diagonals is 101.
          What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in the same way?
          https://projecteuler.net/problem=28
          """
          total = 1
          n = 1
          for step in range(2, 1002, 2):
              for _ in range(4):
                  n += step
                  total += n
          return total
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler028.py"
  - language: "ruby"
    code: |
      def euler028_solution
        sum = 1
        (1..500).each do |k|
          side = 2 * k + 1
          corner = side * side
          sum += corner + (corner - 2 * k) + (corner - 4 * k) + (corner - 6 * k)
        end
        sum
      end
      
      puts euler028_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler028.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func main() {
          sum := 1
          for n := 3; n <= 1001; n += 2 {
              corner := n * n
              sum += corner + (corner - (n - 1)) + (corner - 2*(n-1)) + (corner - 3*(n-1))
          }
          fmt.Println(sum)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler028.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=28
      //
      // Starting with the number 1 and moving to the right in a clockwise direction a 5 by 5
      // spiral is formed as follows:
      //
      // 43 44 45 46 47 48 49
      // 42 21 22 23 24 25 26
      // 41 20  7  8  9 10 27
      // 40 19  6  1  2 11 28
      // 39 18  5  4  3 12 29
      // 38 17 16 15 14 13 30
      // 37 36 35 34 33 32 31
      //
      // It can be verified that the sum of the numbers on the diagonals is 101.
      //
      // What is the sum of the numbers on the diagonals in a 1001 by 1001 spiral formed in
      // the same way?
      //
      // Answer: 669171001
      
      pub fn spiral_diagonals(size: u64) -> u64 {
          let mut sum = 1u64;
          let mut n = 1u64;
          let mut step = 2u64;
          while step < size {
              for _ in 0..4 {
                  n += step;
                  sum += n;
              }
              step += 2;
          }
          sum
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_028() {
              assert_eq!(spiral_diagonals(5), 101);
              assert_eq!(spiral_diagonals(1001), 669_171_001);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler028.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background
This problem involves summing the diagonal elements of a square spiral formed by placing numbers in a clockwise pattern starting from the center. The spiral grows by adding layers, with each layer $n$ having side length $2n-1$. The corners of each layer follow a predictable pattern: for layer $n$, the corner values are $n^2$, $n^2 - (n-1)$, $n^2 - 2(n-1)$, and $n^2 - 3(n-1)$.

### Algorithm Analysis
The solution iterates through each layer of the spiral, calculating the four corner values and adding them to a running sum. Starting with the center value of 1, it processes layers from size 3 to the target size (1001) in steps of 2. Each layer computation is $O(1)$, resulting in $O(n)$ time complexity where $n$ is the spiral size. Space complexity is $O(1)$ as only a few variables are used.

### Key Insights
The diagonal sum can be computed without constructing the entire spiral grid. Each layer contributes exactly four diagonal elements (except the center layer), and their values follow the pattern derived from the spiral's growth. For a $1001 \times 1001$ spiral, there are 500 layers beyond the center, giving a total of 2001 diagonal elements summing to 669,171,001.

### Educational Value
This problem demonstrates pattern recognition in mathematical sequences and the power of mathematical insight over brute-force computation. It teaches how to identify regularities in seemingly complex structures and derive closed-form formulas for efficient calculation, avoiding the need to generate large data structures.
