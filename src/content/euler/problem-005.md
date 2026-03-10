---
problemNumber: 5
title: "Smallest Multiple"
description: |
  2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.

  What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
difficulty: "easy"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=5
      
      // 2520 is the smallest number that can be divided by each of the numbers from
      // 1 to 10 without any remainder.
      // What is the smallest positive number that is evenly divisible by all of the
      // numbers from 1 to 20?
      
      // Answer: 232792560
      
      #include <iostream>
      #include <cstdint>
      
      int prob005_brute_force(int max)
      {
        uint32_t answer = 0;
        uint32_t test = max;
        bool check = false;
        while (!check) {
          check = true;
          for( uint32_t i = max ; i && check ; --i){
            check &= (0 == (test%i));
          }
          if( !check ){
            test += 20;
          }
        }
        answer = test;
        return answer;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << prob005_brute_force(20) << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler005.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution005 implements Solution {
        public String solve() {
          int lcm = 1;
          for (int i = 2; i <= 20; i++) {
            lcm = lcm(lcm, i);
          }
          return Integer.toString(lcm);
        }
      
        private int lcm(int a, int b) {
          return a * (b / gcd(a, b));
        }
      
        private int gcd(int a, int b) {
          while (b != 0) {
            int t = b;
            b = a % b;
            a = t;
          }
          return a;
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution005.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer : () => {
          var answer = 0;
          var test = 20;
          var check = false;
      
          while( !check ) {
            check = true;
            for( i = 20 ; i && check ; --i ) {
              check &= (0 == (test % i));
            }
            if( !check ) {
              test += 20;
            }
          }
          return test;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution005.js"
  - language: "python"
    code: |
      def solve():
          """
          Smallest multiple
          2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
          What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?
          """
          from math import gcd
          lcm = 1
          for i in range(1, 21):
              lcm = lcm * i // gcd(lcm, i)
          return lcm
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler005.py"
  - language: "ruby"
    code: |
      def will_divide(test_me)
        20.downto(1) do |i|
          return false if test_me % i != 0
        end
        true
      end
      
      def euler005_solution
        answer = 20
        loop do
          break if will_divide(answer)
      
          answer += 20
        end
        answer
      end
      
      puts euler005_solution if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler005.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func gcd(a, b int64) int64 {
      
          for b != 0 {
      
              a, b = b, a%b
      
          }
      
          return a
      
      }
      
      func lcm(a, b int64) int64 {
      
          return a / gcd(a, b) * b
      
      }
      
      func main() {
      
          n := int64(1)
      
          for i := int64(2); i <= 20; i++ {
      
              n = lcm(n, i)
      
          }
      
          fmt.Println(n)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler005.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=5
      
      // 2520 is the smallest number that can be divided by each of the numbers from
      // 1 to 10 without any remainder.
      // What is the smallest positive number that is evenly divisible by all of the
      // numbers from 1 to 20?
      
      // Answer: 232792560
      
      pub fn prob005_brute_force(max: u32) -> u32
      {
          let mut test = max;
          let mut check = false;
      
          while !check {
              check = true;
              for i in 1..max {
                  check = 0 == (test % i);
                  if !check {
                      break;
                  };
              }
              if !check {
                  test += 20;
              }
          }
          return test;
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_005() {
              assert_eq!(prob005_brute_force(20), 232_792_560);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler005.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

The smallest number divisible by all integers from 1 to n is the Least Common Multiple (LCM) of those numbers. LCM(a,b) is the smallest number that is a multiple of both a and b.

For multiple numbers, LCM can be computed using the formula: LCM(a,b) = (a × b) / GCD(a,b), where GCD is the Greatest Common Divisor. This extends to multiple numbers by computing LCM progressively.

The prime factorization approach gives LCM by taking the highest power of each prime that appears in any factorization: LCM = 2^max(a₂,b₂,c₂,...) × 3^max(a₃,b₃,c₃,...) × ...

### Algorithm Analysis

Two main approaches are shown:

**Brute Force**: Start from n and increment by n (or larger steps), testing divisibility by all numbers from 1 to n. Simple but inefficient for larger n.

**Mathematical (LCM)**: Compute LCM of all numbers from 1 to n using GCD. Much more efficient - O(n log n) vs potentially exponential time for brute force.

The LCM approach uses the Euclidean algorithm for GCD, which is highly efficient. For n=20, the result is 2⁴ × 3² × 5 × 7 × 11 × 13 × 17 × 19 = 232,792,560.

### Key Insights

- The LCM will always be at least as large as the largest number in the range
- Prime factors determine the result - each prime ≤ n must appear at least once
- Higher powers of primes (like 2⁴=16, 3²=9) come from composite numbers in the range
- The mathematical approach is exponentially faster than brute force for larger ranges
- This problem demonstrates why understanding number theory leads to better algorithms

### Educational Value

This problem introduces fundamental concepts:
- The relationship between LCM and GCD
- Prime factorization and its applications
- Why mathematical insight leads to efficient algorithms
- The difference between brute force and optimized approaches
- How number theory principles apply to programming problems
- The importance of understanding problem constraints for algorithm selection
