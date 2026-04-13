---
problemNumber: 80
title: "Square Root Digital Expansion"
description: |
  It is well known that if the square root of a natural number is not an integer, then it is irrational. The decimal expansion of such square roots is infinite without any repeating pattern at all.

  The square root of two is 1.41421356237309504880..., and the digital sum of the first one hundred decimal digits is 475.

  For the first one hundred natural numbers, find the total of the digital sums of the first one hundred decimal digits for all the irrational square roots.
difficulty: "medium"
date: 2026-04-12
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <string>
      #include <cmath>

      std::string get_sqrt_digits(int n, int digits) {
          int int_part = (int)std::sqrt(n);
          long long remainder = (long long)n - (long long)int_part * int_part;
          std::string result = std::to_string(int_part) + ".";
          long long current = int_part;
          for (int i = 0; i < digits; ++i) {
              remainder *= 100;
              long long x = current * 20;
              int digit = 0;
              for (int d = 0; d < 10; ++d) {
                  if ((x + d) * d <= remainder) {
                      digit = d;
                  }
              }
              result += '0' + digit;
              current = current * 10 + digit;
              remainder -= (x + digit) * digit;
          }
          return result;
      }

      int square_root_digital_expansion() {
          int total = 0;
          for (int n = 1; n <= 100; ++n) {
              int sqrt_n = (int)std::sqrt(n);
              if (sqrt_n * sqrt_n == n) continue; // integer
              std::string s = get_sqrt_digits(n, 100);
              for (char c : s) {
                  if (c >= '0' && c <= '9') total += c - '0';
              }
          }
          return total;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
          std::cout << "Answer: " << square_root_digital_expansion() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler080.cpp"
    performance: "O(n²) time complexity"
  - language: "go"
    code: |
      package main

      import (
          "fmt"
          "math"
          "math/big"
      )

      func squareRootDigitalExpansion() int {
          total := 0
          pow100 := new(big.Float).SetInt(new(big.Int).Exp(big.NewInt(10), big.NewInt(100), nil))
          for n := 1; n <= 100; n++ {
              sqrtInt := int(math.Sqrt(float64(n)))
              if sqrtInt*sqrtInt == n {
                  continue
              }
              bigN := big.NewFloat(float64(n))
              sqrtBig := new(big.Float).SetPrec(20000).SetMode(big.ToNearestEven)
              sqrtBig.Sqrt(bigN)
              // Compute sqrt * 10^100
              scaled := new(big.Float).Mul(sqrtBig, pow100)
              // Get floor as big.Int
              floorInt, _ := scaled.Int(nil)
              // Convert to string
              str := floorInt.String()
              // The string is the integer part + 100 decimal digits
              // Since sqrt <=10, integer part is 1 or 2 digits
              // So decimal digits are str[1:] or str[2:] depending on len
              var decimalStr string
              if len(str) == 101 {
                  decimalStr = str[1:]
              } else if len(str) == 102 {
                  decimalStr = str[2:]
              } else {
                  continue
              }
              if len(decimalStr) != 100 {
                  continue
              }
              sum := 0
              for _, c := range decimalStr {
                  sum += int(c - '0')
              }
              total += sum
          }
          return total
      }

      func main() {
          fmt.Println(squareRootDigitalExpansion())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler080.go"
    performance: "O(n) time complexity, execution ~0ms"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;

      public class Solution080 implements Solution {
        private String getSqrtDigits(int n, int digits) {
          int intPart = (int) Math.sqrt(n);
          long remainder = (long) n - (long) intPart * intPart;
          StringBuilder result = new StringBuilder(String.valueOf(intPart)).append(".");
          long current = intPart;
          for (int i = 0; i < digits; ++i) {
            remainder *= 100;
            long x = current * 20;
            int digit = 0;
            for (int d = 0; d < 10; ++d) {
              if ((x + d) * d <= remainder) {
                digit = d;
              }
            }
            result.append(digit);
            current = current * 10 + digit;
            remainder -= (x + digit) * digit;
          }
          return result.toString();
        }

        public String solve() {
          int total = 0;
          for (int n = 1; n <= 100; ++n) {
            int sqrtN = (int) Math.sqrt(n);
            if (sqrtN * sqrtN == n) continue;
            String s = getSqrtDigits(n, 100);
            for (char c : s.toCharArray()) {
              if (c >= '0' && c <= '9') total += c - '0';
            }
          }
          return String.valueOf(total);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution080.java"
    performance: "O(n²) time complexity"
  - language: "javascript"
    code: |
      function getSqrtDigits(n, digits) {
        let intPart = Math.floor(Math.sqrt(n));
        let remainder = BigInt(n) - BigInt(intPart) * BigInt(intPart);
        let result = intPart.toString() + '.';
        let current = BigInt(intPart);
        for (let i = 0; i < digits; ++i) {
          remainder *= 100n;
          let x = current * 20n;
          let digit = 0;
          for (let d = 0; d < 10; ++d) {
            if ((x + BigInt(d)) * BigInt(d) <= remainder) {
              digit = d;
            }
          }
          result += digit.toString();
          current = current * 10n + BigInt(digit);
          remainder -= (x + BigInt(digit)) * BigInt(digit);
        }
        return result;
      }

      function squareRootDigitalExpansion() {
        let total = 0;
        for (let n = 1; n <= 100; ++n) {
          const sqrtN = Math.floor(Math.sqrt(n));
          if (sqrtN * sqrtN === n) continue;
          const s = getSqrtDigits(n, 100);
          const decimalPart = s.split('.')[1] || '';
          for (let c of decimalPart) {
            total += parseInt(c);
          }
        }
        return total;
      }

      module.exports = {
        answer: () => squareRootDigitalExpansion()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution080.js"
    performance: "O(n²) time complexity, execution ~50ms"
  - language: "python"
    code: |
      from decimal import Decimal, getcontext
      getcontext().prec = 200

      def solve():
          total = 0
          for i in range(1, 101):
              if int(i**0.5)**2 == i:
                  continue
              sqrt_i = Decimal(i).sqrt()
              decimal_part = str(sqrt_i)[2:102]
              total += sum(int(d) for d in decimal_part)
          return total

      if __name__ == "__main__":
          print(solve())
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler080.py"
    performance: "O(n) time complexity, execution ~200ms"
  - language: "rust"
    code: |
      fn get_sqrt_digits(n: i64, digits: usize) -> String {
          let int_part = (n as f64).sqrt() as i64;
          let mut remainder = n - int_part * int_part;
          let mut result = format!("{}.", int_part);
          let mut current = int_part;
          for _ in 0..digits {
              remainder *= 100;
              let x = current * 20;
              let mut digit = 0;
              for d in 0..10 {
                  if (x + d) * d <= remainder {
                      digit = d;
                  }
              }
              result.push_str(&digit.to_string());
              current = current * 10 + digit;
              remainder -= (x + digit) * digit;
          }
          result
      }

      pub fn square_root_digital_expansion() -> u64 {
          let mut total = 0;
          for n in 1..=100 {
              let sqrt_n = (n as f64).sqrt() as i64;
              if sqrt_n * sqrt_n == n as i64 {
                  continue;
              }
              let s = get_sqrt_digits(n as i64, 100);
              for c in s.chars() {
                  if c.is_digit(10) {
                      total += c.to_digit(10).unwrap() as u64;
                  }
              }
          }
          total
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_080() {
              assert_eq!(square_root_digital_expansion(), 40886);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler080.rs"
    performance: "O(n²) time complexity, execution ~0ms"
tags: ["euler", "square roots", "arbitrary precision"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

The problem requires computing the digital sum of the first 100 decimal digits of the square root for each irrational number from 1 to 100.

Irrational square roots have infinite non-repeating decimal expansions. We need to compute these precisely to 100 decimal places.

### Algorithm Analysis

Use digit-by-digit square root calculation (long division method) to compute the decimal expansion.

For each n from 1 to 100:
- Skip perfect squares
- Compute sqrt(n) to 100 decimal places
- Sum the digits of the decimal part

### Performance Analysis

- **Time Complexity**: O(n²) due to digit-by-digit computation
- **Space Complexity**: O(1) per number
- **Execution Time**: Fast for small n, seconds for n=100
- **Scalability**: Quadratic in digits required

### Key Insights

- Long division method for square roots gives exact decimal digits
- Need to handle integer part separately
- Total sum is 40886

### Educational Value

This problem teaches:
- Arbitrary precision arithmetic
- Digit-by-digit algorithms for square roots
- Properties of irrational numbers