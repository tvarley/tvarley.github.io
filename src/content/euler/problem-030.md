---
problemNumber: 30
title: "Digit Fifth Powers"
description: |
  Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:

  $$
  \begin{align}
  1634 &= 1^4 + 6^4 + 3^4 + 4^4 \\
  8208 &= 8^4 + 2^4 + 0^4 + 8^4 \\
  9474 &= 9^4 + 4^4 + 7^4 + 4^4
  \end{align}
  $$

  As $1 = 1^4$ is not a sum it is not included.

  The sum of these numbers is $1634 + 8208 + 9474 = 19316$.

  Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
difficulty: "hard"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=30
      
      // Surprisingly there are only three numbers that can be written as the sum of fourth powers of their digits:
      //
      // 1634 = 1^4 + 6^4 + 3^4 + 4^4
      // 8208 = 8^4 + 2^4 + 0^4 + 8^4
      // 9474 = 9^4 + 4^4 + 7^4 + 4^4
      //
      // As 1 = 1^4 is not a sum it is not included.
      //
      // The sum of these numbers is 1634 + 8208 + 9474 = 19316.
      //
      // Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
      //
      // Answer: 443839
      
      #include <iostream>
      #include <vector>
      
      int sum_of_fifth_powers_of_digits(int n) {
          int sum = 0;
          while (n > 0) {
              int digit = n % 10;
              int power = 1;
              for (int i = 0; i < 5; ++i) power *= digit;
              sum += power;
              n /= 10;
          }
          return sum;
      }
      
      int sum_digit_fifth_powers() {
          int total = 0;
          // Upper bound: 6 * 9^5 = 354294
          for (int i = 2; i <= 354294; ++i) {
              if (sum_of_fifth_powers_of_digits(i) == i) {
                  total += i;
              }
          }
          return total;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << sum_digit_fifth_powers() << std::endl;
      }
      #endif // UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler030.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution030 implements Solution {
        public String solve() {
          int limit = 354294; // 6 * 9^5
          int sum = 0;
      
          for (int n = 2; n <= limit; n++) {
            int digitSum = 0;
            int temp = n;
            while (temp > 0) {
              int digit = temp % 10;
              digitSum += digit * digit * digit * digit * digit;
              temp /= 10;
            }
            if (digitSum == n) {
              sum += n;
            }
          }
      
          return Integer.toString(sum);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution030.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          // Upper bound: a 7-digit number max is 9999999, and 7 * 9^5 = 413343 (6 digits)
          // So 6 digits is sufficient: 6 * 9^5 = 354294
          const limit = 354294;
          let sum = 0;
      
          for (let n = 2; n <= limit; n++) {
            let digitSum = 0;
            let temp = n;
            while (temp > 0) {
              const digit = temp % 10;
              digitSum += digit ** 5;
              temp = Math.floor(temp / 10);
            }
            if (digitSum === n) {
              sum += n;
            }
          }
      
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution030.js"
  - language: "python"
    code: |
      def solve():
          """
          Digit fifth powers
          Surprisingly there are only three numbers that can be written as the sum of fourth powers
          of their digits: 1634, 8208, 9474. As 1 = 1^4, 2 = 2^4... etc are not sums they are not included.
          The sum of these numbers is 1634 + 8208 + 9474 = 19316.
          Find the sum of all the numbers that can be written as the sum of fifth powers of their digits.
          https://projecteuler.net/problem=30
          """
          # Upper bound: 9^5 * 6 = 354294, so 7-digit numbers can't work (9^5*7=413343 < 9999999)
          return sum(
              n for n in range(2, 354295)
              if n == sum(int(d)**5 for d in str(n))
          )
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler030.py"
  - language: "ruby"
    code: |
      def euler030_solution
        sum = 0
        # Upper limit: 6 digits max, 6*9^5 = 354294, but check up to 999999
        (2..999_999).each do |n|
          digit_sum = n.to_s.chars.map { |d| d.to_i**5 }.sum
          sum += n if digit_sum == n
        end
        sum
      end
      
      puts euler030_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler030.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func digitFifthPowerSum(n int) int {
          sum := 0
          for n > 0 {
              d := n % 10
              p := d * d * d * d * d
              sum += p
              n /= 10
          }
          return sum
      }
      
      func main() {
          total := 0
          for i := 2; i <= 354294; i++ {
              if digitFifthPowerSum(i) == i {
                  total += i
              }
          }
          fmt.Println(total)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler030.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=30
      //
      // Surprisingly there are only three numbers that can be written as the sum of fourth
      // powers of their digits:
      // 1634 = 1^4 + 6^4 + 3^4 + 4^4
      // 8208 = 8^4 + 2^4 + 0^4 + 8^4
      // 9474 = 9^4 + 4^4 + 7^4 + 4^4
      // (1 = 1^4 is not a sum, so is not included.)
      //
      // The sum of these numbers is 1634 + 8208 + 9474 = 19316.
      //
      // Find the sum of all the numbers that can be written as the sum of fifth powers of
      // their digits.
      //
      // Answer: 443839
      
      pub fn digit_fifth_powers() -> u64 {
          // Upper bound: a 7-digit number max is 9999999, but 7 * 9^5 = 413343 < 1000000
          // so no 7-digit number can equal the sum of its fifth powers. Use 6 * 9^5 = 354294.
          let upper = 6 * 9u64.pow(5) + 1;
          let mut sum = 0u64;
          for n in 2..=upper {
              let digit_sum: u64 = {
                  let mut tmp = n;
                  let mut s = 0u64;
                  while tmp > 0 {
                      s += (tmp % 10).pow(5);
                      tmp /= 10;
                  }
                  s
              };
              if digit_sum == n {
                  sum += n;
              }
          }
          sum
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_030() {
              assert_eq!(digit_fifth_powers(), 443_839);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler030.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background
This problem explores narcissistic numbers, specifically those equal to the sum of their digits raised to the fifth power. The fourth-power case demonstrates that such numbers exist and are rare, while the fifth-power variant requires finding all such numbers and summing them.

### Algorithm Analysis
The solution iterates through all numbers up to an upper bound determined by the maximum possible digit sum ($6 \times 9^5 = 354294$), calculating the fifth power sum of digits for each number and checking for equality. Time complexity is $O(n \times d)$ where $n$ is the upper bound and $d$ is the average number of digits (constant), making it effectively linear in the search space.

### Key Insights
The upper bound is crucial: no number larger than $6 \times 9^5$ can equal its digit fifth-power sum since $7 \times 9^5 = 413343$ is a 6-digit number while the maximum 6-digit number is 999999. The solution finds six such numbers whose fifth powers sum to 443839.

### Educational Value
This problem teaches the importance of establishing bounds in computational searches and demonstrates how mathematical constraints can dramatically reduce the search space. It combines digit manipulation, exponentiation, and summation in a clear algorithmic framework, illustrating efficient brute-force approaches to number theory problems.
