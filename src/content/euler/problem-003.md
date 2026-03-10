---
problemNumber: 3
title: "Largest Prime Factor"
description: "The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143 ? Answer: 6857"
difficulty: "easy"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=3
      
      // The prime factors of 13195 are 5, 7, 13 and 29.
      //
      // What is the largest prime factor of the number 600851475143
      
      // Answer: 6857
      
      #include <iostream>
      #include <cstdint>
      
      using namespace std;
      
      uint64_t largest_prime_factor(uint64_t number)
      {
        uint64_t answer = 1;
        uint64_t point = 3;
        uint64_t divisor = number;
      
        while (divisor % 2 == 0) {
          answer = 2;
          divisor = divisor/2;
        }
      
        while (divisor != 1) {
            while (divisor % point == 0) {
              answer = point;
              divisor = divisor/point;
            }
            point += 2;
        }
      
        return answer;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << largest_prime_factor(600851475143) << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler003.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution003 implements Solution {
        public String solve() {
          return "6857";
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution003.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer : () => {
          answer = 2;
          point = 3;
          divisor = 600851475143;
      
          while(divisor != 1) {
            while( (divisor % 2) == 0) { divisor /= 2; }
            while ((divisor % point) == 0) {
              answer = point;
              divisor /= point;
            }
            point += 2;
          }
          return answer;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution003.js"
  - language: "python"
    code: |
      def solve():
          """
          Largest prime factor
          The prime factors of 13195 are 5, 7, 13 and 29.
          What is the largest prime factor of the number 600851475143?
          """
          n = 600851475143
          i = 2
          while i * i <= n:
              if n % i:
                  i += 1
              else:
                  n //= i
          return n
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler003.py"
  - language: "ruby"
    code: |
      def largest_prime_number(upper)
        answer = 2
        point = 3
        divisor = upper
      
        divisor /= 2 while divisor.even?
      
        while divisor != 1
          while (divisor % point).zero?
            answer = point
            divisor /= point
          end
          point += 2
        end
        answer
      end
      
      puts largest_prime_number(600_851_475_143) if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler003.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func main() {
      
          n := 600851475143
      
          largest := 0
      
          // Remove factors of 2
      
          for n%2 == 0 {
      
              n /= 2
      
              largest = 2
      
          }
      
          // Check odd factors
      
          for i := 3; i*i <= n; i += 2 {
      
              for n%i == 0 {
      
                  n /= i
      
                  largest = i
      
              }
      
          }
      
          // If n is prime greater than 2
      
          if n > 1 {
      
              largest = n
      
          }
      
          fmt.Println(largest)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler003.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=3
      
      // The prime factors of 13195 are 5, 7, 13 and 29.
      //
      // What is the largest prime factor of the number 600851475143
      
      // Answer: 6857
      
      pub fn largest_prime_factor(number: u64) -> u64
      {
          let mut answer = 1;
          let mut point = 3;
          let mut divisor = number;
      
          while divisor % 2 == 0 {
              answer = 2;
              divisor = divisor/2;
          }
      
          while divisor != 1 {
              while divisor % point == 0 {
                  answer = point;
                  divisor = divisor/point;
              }
              point += 2;
          }
      
          return answer;
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_003() {
              assert_eq!(largest_prime_factor(600_851_475_143), 6857);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler003.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 3: Largest Prime Factor.

The prime factors of 13195 are 5, 7, 13 and 29. What is the largest prime factor of the number 600851475143 ? Answer: 6857
