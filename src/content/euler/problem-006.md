---
problemNumber: 6
title: "Sum Square Difference"
description: "The sum of the squares of the first ten natural numbers is 1² + 2² + ... + 10² = 385. The square of the sum of the first ten natural numbers is (1 + 2 + ... + 10)² = 55² = 3025. Hence the difference between the sum of the squares and the square of the sum is 3025 - 385 = 2640. Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum."
difficulty: "easy"
date: 2015-01-07
technologies: ["cpp", "javascript", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <cmath>

      long long sum_of_squares(int n) {
          long long sum = 0;
          for (int i = 1; i <= n; ++i) {
              sum += i * i;
          }
          return sum;
      }

      long long square_of_sum(int n) {
          long long sum = n * (n + 1) / 2;
          return sum * sum;
      }

      long long sum_square_difference(int n) {
          return square_of_sum(n) - sum_of_squares(n);
      }

      int main() {
          std::cout << sum_square_difference(100) << std::endl;
          return 0;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler006.cpp"
    performance: "O(n) time complexity"
  - language: "javascript"
    code: |
      function sumOfSquares(n) {
          let sum = 0;
          for (let i = 1; i <= n; i++) {
              sum += i * i;
          }
          return sum;
      }

      function squareOfSum(n) {
          const sum = n * (n + 1) / 2;
          return sum * sum;
      }

      function sumSquareDifference(n) {
          return squareOfSum(n) - sumOfSquares(n);
      }

      console.log(sumSquareDifference(100));
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler006.js"
  - language: "ruby"
    code: |
      def sum_of_squares(n)
        (1..n).inject(0) { |sum, i| sum + i*i }
      end

      def square_of_sum(n)
        sum = n * (n + 1) / 2
        sum * sum
      end

      def sum_square_difference(n)
        square_of_sum(n) - sum_of_squares(n)
      end

      puts sum_square_difference(100)
    githubLink: "https://gitlab.com/tvarley/euler/blob/master/ruby/lib/euler006.rb"
  - language: "go"
    code: |
      package main

      import "fmt"

      func sumOfSquares(n int) int64 {
          var sum int64 = 0
          for i := 1; i <= n; i++ {
              sum += int64(i * i)
          }
          return sum
      }

      func squareOfSum(n int) int64 {
          sum := int64(n * (n + 1) / 2)
          return sum * sum
      }

      func sumSquareDifference(n int) int64 {
          return squareOfSum(n) - sumOfSquares(n)
      }

      func main() {
          fmt.Println(sumSquareDifference(100))
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler006.go"
  - language: "rust"
    code: |
      fn sum_of_squares(n: usize) -> u64 {
          (1..=n).map(|i| (i as u64).pow(2)).sum()
      }

      fn square_of_sum(n: usize) -> u64 {
          let sum: u64 = (n * (n + 1) / 2) as u64;
          sum * sum
      }

      fn sum_square_difference(n: usize) -> u64 {
          square_of_sum(n) - sum_of_squares(n)
      }

      fn main() {
          println!("{}", sum_square_difference(100));
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler006.rs"
tags: ["euler", "sum-of-squares", "square-of-sum"]
featured: false
showcase: true
---

## Formula Optimization

While the brute force approach works, this problem can be solved using closed-form formulas:

- Sum of squares: n(n+1)(2n+1)/6
- Square of sum: [n(n+1)/2]²

The difference can be calculated in O(1) time using these formulas, making it an excellent example of mathematical optimization over computational brute force.