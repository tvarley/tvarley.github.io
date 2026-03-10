---
problemNumber: 7
title: "10001st Prime"
description: |
  By listing the first six prime numbers: $2, 3, 5, 7, 11$, and $13$, we can see that the $6$th prime is $13$.

  What is the $10\,001$st prime number?
difficulty: "easy"
date: 2026-03-10
technologies: ["cpp", "java", "javascript", "python", "ruby", "go", "rust"]
implementations:
  - language: "cpp"
    code: |
      // https://projecteuler.net/problem=7
      
      // By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
      // we can see that the 6th prime is 13.
      //
      // What is the 10001st prime number?
      
      // Answer: 104743
      
      #include <iostream>
      #include <memory>
      
      #include "sieve_eratos.h"
      
      int nth_prime(size_t nth)
      {
        std::unique_ptr<CSieveOfEratosthenes> sieve(new CSieveOfEratosthenes(110000));
        if( sieve ){
          return sieve->get_nth(nth);
        }
        return 0;
      }
      
      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
        std::cout << "Answer: " << nth_prime(10001) << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler007.cpp"
    performance: "O(n) time complexity"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;
      
      import org.tvarley.euler.Solution;
      import org.tvarley.euler.util.Prime;
      
      public class Solution007 implements Solution {
        public String solve() {
          int count = 0;
          int candidate = 2;
          while (count < 10001) {
            if (Prime.isPrime(candidate)) {
              count++;
            }
            candidate++;
          }
          return Integer.toString(candidate - 1);
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution007.java"
  - language: "javascript"
    code: |
      function isPrime(n) {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 === 0 || n % 3 === 0) return false;
      
        for (let i = 5; i * i <= n; i += 6) {
          if (n % i === 0 || n % (i + 2) === 0) return false;
        }
        return true;
      }
      
      module.exports = {
        answer: () => {
          let count = 0;
          let num = 1;
      
          while (count < 10001) {
            num++;
            if (isPrime(num)) {
              count++;
            }
          }
          return num;
        }
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution007.js"
  - language: "python"
    code: |
      def solve():
          """
          10001st prime
          By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
          we can see that the 6th prime is 13.
          What is the 10 001st prime number?
          """
          def is_prime(n):
              if n < 2:
                  return False
              for i in range(2, int(n**0.5) + 1):
                  if n % i == 0:
                      return False
              return True
      
          count = 0
          num = 1
          while count < 10001:
              num += 1
              if is_prime(num):
                  count += 1
          return num
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler007.py"
  - language: "ruby"
    code: |
      require 'prime'
      
      def find_10001_prime
        sieve = Prime::EratosthenesGenerator.new
        answer = 0
        10_001.times { |_i| answer = sieve.next }
        answer
      end
      
      puts find_10001_prime if __FILE__ == $PROGRAM_NAME
    githubLink: "https://github.com/tvarley/euler/blob/master/ruby/lib/euler007.rb"
  - language: "go"
    code: |
      package main
      
      import "fmt"
      
      func sieve(limit int) []bool {
      
          isPrime := make([]bool, limit+1)
      
          for i := range isPrime {
      
              isPrime[i] = true
      
          }
      
          isPrime[0], isPrime[1] = false, false
      
          for i := 2; i*i <= limit; i++ {
      
              if isPrime[i] {
      
                  for j := i * i; j <= limit; j += i {
      
                      isPrime[j] = false
      
                  }
      
              }
      
          }
      
          return isPrime
      
      }
      
      func main() {
      
          limit := 200000
      
          primes := sieve(limit)
      
          count := 0
      
          for i := 2; i <= limit; i++ {
      
              if primes[i] {
      
                  count++
      
                  if count == 10001 {
      
                      fmt.Println(i)
      
                      return
      
                  }
      
              }
      
          }
      
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler007.go"
  - language: "rust"
    code: |
      // https://projecteuler.net/problem=7
      //
      // By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13,
      // we can see that the 6th prime is 13.
      //
      // What is the 10 001st prime number?
      //
      // Answer: 104743
      
      pub fn nth_prime(n: usize) -> u64 {
          if n == 1 {
              return 2;
          }
          let mut primes = vec![2u64];
          let mut candidate = 3u64;
          let upper_limit = 200_000u64; // Sufficient for 10001st prime
          let mut is_prime = vec![true; (upper_limit + 1) as usize];
          is_prime[0] = false;
          is_prime[1] = false;
          
          while primes.len() < n {
              if is_prime[candidate as usize] {
                  primes.push(candidate);
                  // Mark multiples
                  let mut multiple = candidate * 2;
                  while multiple <= upper_limit {
                      is_prime[multiple as usize] = false;
                      multiple += candidate;
                  }
              }
              candidate += 2;
          }
          primes[n - 1]
      }
      
      #[cfg(test)]
      mod tests {
          use super::*;
      
          #[test]
          fn euler_007() {
              assert_eq!(nth_prime(6), 13);
              assert_eq!(nth_prime(10_001), 104_743);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler007.rs"
tags: ["euler"]
featured: false
showcase: true
---

## Solution Notes

### Mathematical Background

Prime numbers are integers greater than 1 that have no positive divisors other than 1 and themselves. The nth prime number refers to the prime at position n in the sequence of primes ordered by size.

The prime number theorem provides an asymptotic approximation: the nth prime is approximately $n \ln n$. For n=10,001, this gives roughly 10,001 × ln(10,001) ≈ 10,001 × 9.21 ≈ 92,000, which is close to the actual value of 104,743.

The distribution of primes becomes sparser as numbers grow, following the prime number theorem: $\pi(n) \approx \frac{n}{\ln n}$ where $\pi(n)$ is the number of primes ≤ n.

### Algorithm Analysis

The implementations demonstrate different approaches to finding the nth prime:

**Trial division**: Test each candidate number for primality by checking divisibility up to √n. Simple but inefficient for large n.

**Incremental sieve**: Build a sieve incrementally as needed, only up to the required size. More memory efficient than pre-computing a large sieve.

**Optimized trial division**: Skip even numbers after 2, use 6k±1 optimization for checking factors. Balances simplicity with performance.

Time complexity varies: trial division is O(n√p) where p is the nth prime, while sieve approaches are O(n log log n) for the range needed.

### Key Insights

- The 10,001st prime (104,743) is relatively small compared to what might be expected
- Most implementations use a sieve of Eratosthenes approach for efficiency
- The search space needs to be large enough - typically around n×ln(n)×ln(n) gives good bounds
- Even numbers >2 are never prime, allowing significant optimization
- The pattern 6k±1 covers all potential primes except 2 and 3
- Performance depends heavily on the primality test efficiency

### Educational Value

This problem introduces fundamental concepts in:
- Prime number generation and testing algorithms
- The sieve of Eratosthenes as an efficient prime-finding method
- The mathematical properties of prime distributions
- Algorithm selection based on problem constraints
- The trade-offs between time and space complexity
- Understanding when to pre-compute vs. compute on-demand
- The importance of mathematical bounds in algorithm design
