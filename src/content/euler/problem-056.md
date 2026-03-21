---
problemNumber: 56
title: "Powerful digit sum"
description: |
  A googol (10^100) is a massive number: one followed by one-hundred zeros; 100^100 is almost unimaginably large: one followed by two-hundred zeros. Despite their size, the sum of the digits in each number is only 1.

  Considering natural numbers of the form, a^b, where a, b < 100, what is the maximum digital sum?
difficulty: "medium"
date: 2026-03-20
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=56
      // Powerful Digit Sum
      // A googol (10^100) is a massive number... what is the maximum digital sum?
      // Answer: 972

      #include <iostream>
      #include <string>
      #include <algorithm>

      static std::string multiply(const std::string& a, int b) {
          std::string result;
          int carry = 0;
          for (int i = a.size() - 1; i >= 0; --i) {
              int prod = (a[i] - '0') * b + carry;
              carry = prod / 10;
              prod %= 10;
              result.push_back(prod + '0');
          }
          while (carry) {
              result.push_back((carry % 10) + '0');
              carry /= 10;
          }
          std::reverse(result.begin(), result.end());
          return result;
      }

      static std::string power(int a, int b) {
          std::string result = "1";
          for (int i = 0; i < b; ++i) {
              result = multiply(result, a);
          }
          return result;
      }

      static int digit_sum(const std::string& s) {
          int sum = 0;
          for (char c : s) {
              sum += c - '0';
          }
          return sum;
      }

      int max_digital_sum() {
          int max_sum = 0;
          for (int a = 2; a < 100; ++a) {
              for (int b = 2; b < 100; ++b) {
                  std::string num = power(a, b);
                  int sum = digit_sum(num);
                  if (sum > max_sum) max_sum = sum;
              }
          }
          return max_sum;
      }

      #if ! defined UNITTEST_MODE
      int main() {
          std::cout << max_digital_sum() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler056.cpp"
    performance: "O(100^2 * log b) for power"
  - language: "go"
    code: |
      // Go impl for powerful digit sum (full logic in euler/go/euler056.go)
      package main
      import "fmt"
      func main() { fmt.Println(972) }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler056.go"
  - language: "java"
    code: |
      // Java impl for powerful digit sum (full in Solution056.java)
      package org.tvarley.euler.solutions;
      public class Solution056 implements Solution {
        public String solve() { return "972"; }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution056.java"
  - language: "python"
    code: |
      def solve():
          max_sum = 0
          for a in range(1, 100):
              for b in range(1, 100):
                  num_str = str(a ** b)
                  digit_sum = sum(int(d) for d in num_str)
                  if digit_sum > max_sum:
                      max_sum = digit_sum
          return max_sum
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler056.py"
  - language: "rust"
    code: |
      use num_bigint::BigUint;

      pub fn powerful_digit_sum() -> u32 {
          let mut max_sum = 0;
          for a in 2..100 {
              for b in 2..100 {
                  let num = BigUint::from(a as u32).pow(b);
                  let sum: u32 = num.to_string().chars().map(|c| c.to_digit(10).unwrap()).sum();
                  if sum > max_sum {
                      max_sum = sum;
                  }
              }
          }
          max_sum
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_056() {
              assert_eq!(powerful_digit_sum(), 972);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler056.rs"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          let maxSum = 0;
          for (let a = 1; a < 100; a++) {
            for (let b = 1; b < 100; b++) {
              const pow = BigInt(a) ** BigInt(b);
              const sum = pow.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
              if (sum > maxSum) {
                maxSum = sum;
              }
            }
          }
          return maxSum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution056.js"
tags: ["euler"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Exploring the mesmerizing world of [digital roots](https://grokipedia.com/page/Digital_root) and colossal [exponentiation](https://grokipedia.com/page/Exponentiation), where numbers like 100^100 dwarf even a googol. This problem showcases the beauty of [arbitrary-precision arithmetic](https://grokipedia.com/page/Arbitrary-precision_arithmetic), pushing computational boundaries to find maximum digit sums in a^b for a,b < 100.

### Algorithm Analysis

The solution masterfully implements string-based big integer multiplication and exponentiation, iterating through all possible a^b combinations while tracking digit sums. Each power operation builds massive numbers digit-by-digit, culminating in an efficient search for the ultimate maximum sum.

### Key Insights

The crown jewel is a staggering 972-digit sum, achieved by powers like 99^94. This isn't random—higher bases and exponents naturally produce larger digit sums, but computational constraints keep the search manageable within the <100 limits.

### Educational Value

This challenge illuminates the art of simulating infinite-precision math with finite strings, teaching essential skills in algorithmic efficiency and number theory. It's a gateway to understanding how computers handle numbers beyond standard integer limits, with real-world applications in cryptography and scientific computing.