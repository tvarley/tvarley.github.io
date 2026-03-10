---
problemNumber: 16
title: "Power Digit Sum"
description: |
  $2^{15} = 32768$ and the sum of its digits is $3 + 2 + 7 + 6 + 8 = 26$.

  What is the sum of the digits of the number $2^{1000}$?
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=16
      // Power digit sum
      
      // 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
      //
      // What is the sum of the digits of the number 2^1000?
      
      // Answer: 1366
      
      #include <iostream>
      #include <vector>
      #include <sstream>
      #include <algorithm>
      
      int power_digit_sum(size_t max)
      {
        std::vector<int> numbers;
        numbers.push_back(1);
      
        std::cout << std::endl;
      
        for (size_t i = 0; i < max; i++) {
          int carry = 0;
      
          std::for_each(numbers.begin(),numbers.end(),[&carry](int&  n){
            n *= 2;
            n += carry;
            carry = ( n >= 10 )?1:0;
            n -= (carry * 10);
          });
      
          if( 0 != carry ){
            numbers.push_back(carry);
          }
        }
      
        int total = 0;
      
        for (auto itr = numbers.rbegin() ; itr != numbers.rend() ; itr++) {
          total += *itr;
        }
      
        return total;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
        std::cout << "Answer: " << power_digit_sum(15) << std::endl;
        std::cout << "Answer: " << power_digit_sum(1000) << std::endl;
        return 0;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler016.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.math.BigInteger;
      
      public class Solution016 implements Solution {
        public String solve() {
          BigInteger power = BigInteger.valueOf(2).pow(1000);
          String powerStr = power.toString();
          int sum = 0;
          for (char c : powerStr.toCharArray()) {
            sum += c - '0';
          }
          return Integer.toString(sum);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution016.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          let num = 2n ** 1000n;
          let sum = 0;
          let numStr = num.toString();
      
          for (let digit of numStr) {
            sum += parseInt(digit);
          }
      
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution016.js"
  - language: "python"
    code: |
      def solve():
          """
          Power digit sum
          2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
          What is the sum of the digits of the number 2^1000?
          """
          return sum(int(d) for d in str(2**1000))
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler016.py"
  - language: "ruby"
    code: |
      def power_digit_sum(power)
        digits = (2**power).to_s
        digits.split('').reduce(0) { |sum, digit| sum + digit.to_i }
      end
      
      puts power_digit_sum(1000) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler016.rb"
  - language: "go"
    code: |
      package main
      
      import (
      
          "fmt"
      
          "math/big"
      
      )
      
      func main() {
      
          two := big.NewInt(2)
      
          pow := new(big.Int).Exp(two, big.NewInt(1000), nil)
      
          sum := 0
      
          for _, d := range pow.String() {
      
              sum += int(d - '0')
      
          }
      
          fmt.Println(sum)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler016.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=16
      //
      // 2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
      //
      // What is the sum of the digits of the number 2^1000?
      //
      // Answer: 1366
      
      pub fn power_digit_sum(base: u32, exponent: usize) -> u64 {
          let mut digits = vec![1u32];
          for _ in 0..exponent {
              let mut carry = 0;
              for d in digits.iter_mut() {
                  let temp = *d * base + carry;
                  *d = temp % 10;
                  carry = temp / 10;
              }
              while carry > 0 {
                  digits.push(carry % 10);
                  carry /= 10;
              }
          }
          digits.iter().map(|&d| d as u64).sum()
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_016() {
              assert_eq!(power_digit_sum(2, 15), 26);
              assert_eq!(power_digit_sum(2, 1000), 1366);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler016.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

This problem involves computing $2^{1000}$, a 302-digit number, and summing its digits. Direct computation with standard integer types fails since $2^{1000}$ exceeds the range of 64-bit integers.

The number of digits in $2^n$ is approximately $n 	imes rac{\ln 2}{\ln 10} ≈ n 	imes 0.3010$. For $n = 1000$, this gives about 301.0 digits, matching the actual result.

### Algorithm Analysis

**Big integer multiplication by repeated doubling**: Start with 1, then repeatedly multiply by 2 and handle carry when digits exceed 9. Store the number as an array of digits.

**Digit-by-digit summation**: Convert the final number to a string or iterate through digit array, summing each digit.

**Time complexity**: O(n) where n=1000 is the exponent.
**Space complexity**: O(d) where d≈301 is the number of digits.

### Key Insights

- Standard integer types cannot hold $2^{1000}$ (max unsigned 64-bit is $2^{64}-1$)
- Array-based arbitrary-precision arithmetic handles very large numbers
- The result $2^{1000}$ has 302 digits and digit sum of 1,366
- Each doubling operation requires carry propagation through all digits
- The algorithm scales well for even larger exponents

### Educational Value

This problem teaches:
- Arbitrary-precision arithmetic implementation
- Array-based number representation
- Carry propagation in multiplication
- The limitations of built-in integer types
- When custom algorithms are needed for large numbers
- Digit manipulation and summation techniques
- Exponential growth and its computational implications
