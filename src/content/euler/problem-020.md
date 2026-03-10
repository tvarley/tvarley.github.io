---
problemNumber: 20
title: "Factorial Digit Sum"
description: "n! means n × (n − 1) × ... × 3 × 2 × 1 For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800, and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27. Find the sum of the digits in the number 100! Answer: 648"
difficulty: "medium"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=20
      // Factorial digit sum
      
      // n! means n × (n − 1) × ... × 3 × 2 × 1
      //
      // For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
      // and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
      //
      // Find the sum of the digits in the number 100!
      
      // Answer: 648
      
      #include <iostream>
      #include <chrono>
      
      static const int big_size = 500;
      
      int factorial_digit_sum(int fme)
      {
        int digits[big_size] = {0};
        digits[0] =1;
      
        int sum = 0;
      
        for (size_t factor = 2; factor < fme; factor++) {
          int carry = 0;
          for (size_t j = 0; j < big_size; j++) {
            int x = digits[j] * factor + carry;
            carry = 0;
            sum = x;
            if( x > 9){
              sum = x % 10;
              carry = x / 10;
            }
            digits[j]=sum;
          }
        }
        int ret = 0;
        for (size_t i = 0; i < big_size; i++) {
          ret += digits[i];
        }
        return ret;
      }
      
      int factorial_digit_sum_opt(int fme)
      {
        int digits[big_size] = {0};
        digits[0] =1;
      
        int sum = 0;
      
        int high_water = 2;
      
        for (size_t factor = 2; factor < fme; factor++) {
          int carry = 0;
          for (size_t j = 0; j <= high_water; j++) {
            int x = digits[j] * factor + carry;
            carry = 0;
            sum = x;
            if( x > 9){
              sum = x % 10;
              carry = x / 10;
              if( j == high_water ){
                high_water+=2;
              }
            }
            digits[j]=sum;
          }
        }
        int ret = 0;
        for (size_t i = 0; i < high_water; i++) {
          ret += digits[i];
        }
        return ret;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        typedef std::chrono::high_resolution_clock my_clock;
        typedef std::chrono::milliseconds timer_res;
      
        uint64_t a,b;
        auto p1 = my_clock::now();
        for( int i = 0 ; i < 1000; i++ ){
          a = factorial_digit_sum(100);
        }
        auto p2 = my_clock::now();
      
        auto a1 = p2-p1;
        std::cout << "Brute force took: " << a1.count() << std::endl;
      
        p1 = my_clock::now();
        for( int i = 0 ; i < 1000; i++ ){
          b = factorial_digit_sum_opt(100);
        }
        p2 = my_clock::now();
      
        a1 = p2-p1;
        std::cout << "Opt force took: " << a1.count() << std::endl;
      
        std::cout << "Answer: " << factorial_digit_sum_opt(100) << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler020.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import java.math.BigInteger;
      
      public class Solution020 implements Solution {
        public String solve() {
          BigInteger factorial = BigInteger.ONE;
          for (int i = 1; i <= 100; i++) {
            factorial = factorial.multiply(BigInteger.valueOf(i));
          }
          String factorialStr = factorial.toString();
          int sum = 0;
          for (char c : factorialStr.toCharArray()) {
            sum += c - '0';
          }
          return Integer.toString(sum);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution020.java"
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
          const fact = factorial(100n);
          const factStr = fact.toString();
          let sum = 0;
      
          for (let digit of factStr) {
            sum += parseInt(digit);
          }
      
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution020.js"
  - language: "python"
    code: |
      def solve():
          """
          Factorial digit sum
          n! means n × (n − 1) × ... × 3 × 2 × 1
          For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
          and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
          Find the sum of the digits in the number 100!
          """
          from math import factorial
          return sum(int(d) for d in str(factorial(100)))
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler020.py"
  - language: "ruby"
    code: |
      def euler020_solution
        fact = (1..100).inject(:*)
        fact.to_s.chars.map(&:to_i).sum
      end
      
      puts euler020_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler020.rb"
  - language: "go"
    code: |
      package main
      
      import (
      
          "fmt"
      
          "math/big"
      
      )
      
      func factorial(n int) *big.Int {
      
          res := big.NewInt(1)
      
          for i := 2; i <= n; i++ {
      
              res.Mul(res, big.NewInt(int64(i)))
      
          }
      
          return res
      
      }
      
      func main() {
      
          fact := factorial(100)
      
          sum := 0
      
          for _, d := range fact.String() {
      
              sum += int(d - '0')
      
          }
      
          fmt.Println(sum)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler020.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=20
      //
      // n! means n × (n − 1) × ... × 3 × 2 × 1
      //
      // For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800,
      // and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27.
      //
      // Find the sum of the digits in the number 100!
      //
      // Answer: 648
      
      pub fn factorial_digit_sum(n: usize) -> u64 {
          let mut digits = vec![1u32];
          for i in 2..=n {
              let mut carry = 0;
              for d in digits.iter_mut() {
                  let temp = *d * i as u32 + carry;
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
          fn euler_020() {
              assert_eq!(factorial_digit_sum(10), 27);
              assert_eq!(factorial_digit_sum(100), 648);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler020.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 20: Factorial Digit Sum.

n! means n × (n − 1) × ... × 3 × 2 × 1 For example, 10! = 10 × 9 × ... × 3 × 2 × 1 = 3628800, and the sum of the digits in the number 10! is 3 + 6 + 2 + 8 + 8 + 0 + 0 = 27. Find the sum of the digits in the number 100! Answer: 648
