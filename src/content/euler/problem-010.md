---
problemNumber: 10
title: "Summation of Primes"
description: "The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17. Find the sum of all the primes below two million. Answer: 142913828922"
difficulty: "easy"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=10
      // Summation of primes
      // The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
      //
      // Find the sum of all the primes below two million.
      
      // Answer: 142913828922
      
      #include <iostream>
      #include <memory>
      
      #include "sieve_eratos.h"
      
      uint64_t summation_of_primes()
      {
        CSieveOfEratosthenes cs(2000000);
        return cs.sum(2000000);
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << summation_of_primes() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler010.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      
      public class Solution010 implements Solution {
        public String solve() {
          int limit = 2000000;
          boolean[] isComposite = new boolean[limit + 1];
          long sum = 0;
      
          for (int i = 2; i <= limit; i++) {
            if (!isComposite[i]) {
              sum += i;
              for (int j = i * 2; j <= limit; j += i) {
                isComposite[j] = true;
              }
            }
          }
      
          return Long.toString(sum);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution010.java"
  - language: "javascript"
    code: |
      module.exports = {
        answer: () => {
          const limit = 2000000;
          const sieve = new Array(limit).fill(true);
          sieve[0] = sieve[1] = false;
      
          for (let i = 2; i * i < limit; i++) {
            if (sieve[i]) {
              for (let j = i * i; j < limit; j += i) {
                sieve[j] = false;
              }
            }
          }
      
          let sum = 0;
          for (let i = 2; i < limit; i++) {
            if (sieve[i]) {
              sum += i;
            }
          }
          return sum;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution010.js"
  - language: "python"
    code: |
      def solve():
          """
          Summation of primes
          The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
          Find the sum of all the primes below two million.
          """
          limit = 2000000
          sieve = [True] * limit
          sieve[0] = sieve[1] = False
          for i in range(2, int(limit**0.5) + 1):
              if sieve[i]:
                  for j in range(i * i, limit, i):
                      sieve[j] = False
          return sum(i for i in range(limit) if sieve[i])
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler010.py"
  - language: "ruby"
    code: |
      require 'prime'
      
      def sum_primes
        sieve = Prime::EratosthenesGenerator.new
        prime_sum = 0
        prime = sieve.next
        while prime <= 2_000_000
          prime_sum += prime
          prime = sieve.next
        end
        prime_sum
      end
      
      puts sum_primes if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler010.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func sieve(limit int) []bool {
      
          isPrime := make([]bool, limit)
      
          for i := range isPrime {
      
              isPrime[i] = true
      
          }
      
          isPrime[0], isPrime[1] = false, false
      
          for i := 2; i*i < limit; i++ {
      
              if isPrime[i] {
      
                  for j := i * i; j < limit; j += i {
      
                      isPrime[j] = false
      
                  }
      
              }
      
          }
      
          return isPrime
      
      }
      
      func main() {
      
          limit := 2000000
      
          primes := sieve(limit)
      
          sum := int64(0)
      
          for i := 2; i < limit; i++ {
      
              if primes[i] {
      
                  sum += int64(i)
      
              }
      
          }
      
          fmt.Println(sum)
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler010.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=10
      //
      // The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
      //
      // Find the sum of all the primes below two million.
      //
      // Answer: 142913828922
      
      pub fn sum_primes_below(limit: usize) -> u64 {
          let mut is_prime = vec![true; limit + 1];
          is_prime[0] = false;
          if limit > 0 {
              is_prime[1] = false;
          }
          for i in 2..((limit as f64).sqrt() as usize + 1) {
              if is_prime[i] {
                  for multiple in ((i*i)..=limit).step_by(i) {
                      is_prime[multiple] = false;
                  }
              }
          }
          let mut sum = 0u64;
          for i in 2..=limit {
              if is_prime[i] {
                  sum += i as u64;
              }
          }
          sum
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_010() {
              assert_eq!(sum_primes_below(10), 17);
              assert_eq!(sum_primes_below(2_000_000), 142_913_828_922);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler010.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Additional Notes

This is Project Euler problem 10: Summation of Primes.

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17. Find the sum of all the primes below two million. Answer: 142913828922
