---
problemNumber: 6
title: "Sum Square Difference"
description: "The sum of the squares of the first ten natural numbers is, 1^2 + 2^2 + ... + 10^2 = 385 The square of the sum of the first ten natural numbers is, (1 + 2 + ... + 10)^2 = 55^2 = 3025 Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640. Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum. Answer: 25164150"
difficulty: "easy"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=6
      
      // The sum of the squares of the first ten natural numbers is,
      //
      // 1^2 + 2^2 + ... + 10^2 = 385
      // The square of the sum of the first ten natural numbers is,
      //
      // (1 + 2 + ... + 10)^2 = 55^2 = 3025
      // Hence the difference between the sum of the squares of the first ten
      // natural numbers and the square of the sum is 3025 − 385 = 2640.
      //
      // Find the difference between the sum of the squares of the first one
      // hundred natural numbers and the square of the sum.
      
      // Answer: 25164150
      
      #include <iostream>
      
      int sum_squares(size_t size)
      {
        int sum_square = 0;
        int square_sum = 0;
      
        for(size_t i = (size+1); --i ;)
        {
          sum_square += (i*i);
          square_sum += i;
        }
      
        return ((square_sum*square_sum) - sum_square);
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << sum_squares(100) << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler006.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution006 implements Solution {
        public String solve() {
          int n = 100;
          long sumOfSquares = n * (n + 1) * (2 * n + 1) / 6;
          long squareOfSum = n * n * (n + 1) * (n + 1) / 4;
          long difference = squareOfSum - sumOfSquares;
          return Long.toString(difference);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution006.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer : () => {
          var sum_square = 0;
          var square_sum = 0;
          var size = 100;
      
          for(i = (size + 1); --i ;)
          {
            sum_square += (i * i);
            square_sum += i;
          }
      
          return ((square_sum * square_sum) - sum_square);
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution006.js"
  - language: "python"
    code: |
      def solve():
          """
          Sum square difference
          The sum of the squares of the first ten natural numbers is,
          1^2 + 2^2 + ... + 10^2 = 385
          The square of the sum of the first ten natural numbers is,
          (1 + 2 + ... + 10)^2 = 55^2 = 3025
          Hence the difference between the sum of the squares of the first ten natural numbers
          and the square of the sum is 3025 − 385 = 2640.
          Find the difference between the sum of the squares of the first one hundred natural numbers
          and the square of the sum.
          """
          n = 100
          sum_sq = sum(i**2 for i in range(1, n+1))
          sq_sum = sum(range(1, n+1))**2
          return sq_sum - sum_sq
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler006.py"
  - language: "ruby"
    code: |
      def sum_squares(limit)
        sum_square = 0
        square_sum = 0
      
        (0..limit).each do |i|
          sum_square += (i * i)
          square_sum += i
        end
        (square_sum * square_sum) - sum_square
      end
      
      puts sum_squares(100) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler006.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func main() {
      
          n := 100
      
          sum := 0
      
          sumSq := 0
      
          for i := 1; i <= n; i++ {
      
              sum += i
      
              sumSq += i * i
      
          }
      
          sqSum := sum * sum
      
          diff := sqSum - sumSq
      
          fmt.Println(diff)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler006.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=6
      
      // The sum of the squares of the first ten natural numbers is,
      //
      // 1^2 + 2^2 + ... + 10^2 = 385
      // The square of the sum of the first ten natural numbers is,
      //
      // (1 + 2 + ... + 10)^2 = 55^2 = 3025
      // Hence the difference between the sum of the squares of the first ten
      // natural numbers and the square of the sum is 3025 − 385 = 2640.
      //
      // Find the difference between the sum of the squares of the first one
      // hundred natural numbers and the square of the sum.
      
      // Answer: 25164150
      
      pub fn sum_squares(size: u32) -> u32
      {
          let mut sum_square = 0;
          let mut square_sum = 0;
      
          for i in 1..size + 1 {
              sum_square += i * i;
              square_sum += i;
          }
      
          return (square_sum * square_sum) - sum_square;
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_006() {
              assert_eq!(sum_squares(100), 25_164_150);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler006.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 6: Sum Square Difference.

The sum of the squares of the first ten natural numbers is, 1^2 + 2^2 + ... + 10^2 = 385 The square of the sum of the first ten natural numbers is, (1 + 2 + ... + 10)^2 = 55^2 = 3025 Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 − 385 = 2640. Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum. Answer: 25164150
