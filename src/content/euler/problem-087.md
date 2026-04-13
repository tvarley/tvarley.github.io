---
problemNumber: 87
title: "Prime power triples"
description: "The smallest number expressible as the sum of a prime square, prime cube, and prime fourth power is 28. In fact, there are exactly four numbers below fifty that can be expressed in such a way:\n\n28 = 2² + 2³ + 2⁴\n33 = 3² + 2³ + 2⁴\n49 = 5² + 2³ + 2⁴\n47 = 2² + 3³ + 2⁴\n\nHow many numbers below fifty million can be expressed as the sum of a prime square, prime cube, and prime fourth power?"
difficulty: "easy"
date: "2026-04-12"
technologies: ["prime generation", "brute force", "set"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <set>

      const long long LIMIT = 50000000;

      std::vector<int> primes;

      void generate_primes(int max_n) {
          std::vector<bool> is_prime(max_n + 1, true);
          is_prime[0] = is_prime[1] = false;
          for (long long i = 2; i <= max_n; ++i) {
              if (is_prime[i]) {
                  primes.push_back(i);
                  for (long long j = i * i; j <= max_n; j += i) {
                      is_prime[j] = false;
                  }
              }
          }
      }

      long long prime_power_triples() {
          int max_prime = 0;
          while ((long long)max_prime * max_prime < LIMIT) max_prime++;
          max_prime--;
          generate_primes(max_prime);

          std::set<long long> numbers;
          for (int p4 : primes) {
              long long fourth = (long long)p4 * p4 * p4 * p4;
              if (fourth >= LIMIT) break;
              for (int p3 : primes) {
                  long long cube = (long long)p3 * p3 * p3;
                  if (fourth + cube >= LIMIT) break;
                  for (int p2 : primes) {
                      long long square = (long long)p2 * p2;
                      long long sum = fourth + cube + square;
                      if (sum >= LIMIT) break;
                      numbers.insert(sum);
                  }
              }
          }
          return numbers.size();
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler087.cpp"
    performance: "~100ms"
  - language: "go"
    code: |
      package main

      import (
          "math"
      )

      const LIMIT = 50000000

      var primes []int

      func generatePrimes(maxN int) {
          isPrime := make([]bool, maxN+1)
          for i := range isPrime {
              isPrime[i] = true
          }
          isPrime[0], isPrime[1] = false, false
          for i := 2; i <= maxN; i++ {
              if isPrime[i] {
                  primes = append(primes, i)
                  for j := i * i; j <= maxN; j += i {
                      isPrime[j] = false
                  }
              }
          }
      }

      func primePowerTriples() int {
          maxPrime := 0
          for int64(maxPrime)*int64(maxPrime) < LIMIT {
              maxPrime++
          }
          maxPrime--
          generatePrimes(maxPrime)

          numbers := make(map[int64]bool)
          for _, p4 := range primes {
              fourth := int64(p4) * int64(p4) * int64(p4) * int64(p4)
              if fourth >= LIMIT {
                  break
              }
              for _, p3 := range primes {
                  cube := int64(p3) * int64(p3) * int64(p3)
                  if fourth + cube >= LIMIT {
                      break
                  }
                  for _, p2 := range primes {
                      square := int64(p2) * int64(p2)
                      sum := fourth + cube + square
                      if sum >= LIMIT {
                          break
                      }
                      numbers[sum] = true
                  }
              }
          }
          return len(numbers)
      }

      func main() {
          println("Answer:", primePowerTriples())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler087.go"
    performance: "~100ms"
  - language: "java"
    code: |
      import java.util.*;

      public class Euler087 {
          static final long LIMIT = 50000000L;
          static List<Integer> primes = new ArrayList<>();

          static void generatePrimes(int maxN) {
              boolean[] isPrime = new boolean[maxN + 1];
              Arrays.fill(isPrime, true);
              isPrime[0] = isPrime[1] = false;
              for (int i = 2; i <= maxN; i++) {
                  if (isPrime[i]) {
                      primes.add(i);
                      for (long j = (long) i * i; j <= maxN; j += i) {
                          isPrime[(int) j] = false;
                      }
                  }
              }
          }

          public static int primePowerTriples() {
              int maxPrime = 0;
              while ((long) maxPrime * maxPrime < LIMIT) maxPrime++;
              maxPrime--;
              generatePrimes(maxPrime);

              Set<Long> numbers = new HashSet<>();
              for (int p4 : primes) {
                  long fourth = (long) p4 * p4 * p4 * p4;
                  if (fourth >= LIMIT) break;
                  for (int p3 : primes) {
                      long cube = (long) p3 * p3 * p3;
                      if (fourth + cube >= LIMIT) break;
                      for (int p2 : primes) {
                          long square = (long) p2 * p2;
                          long sum = fourth + cube + square;
                          if (sum >= LIMIT) break;
                          numbers.add(sum);
                      }
                  }
              }
              return numbers.size();
          }

          public static void main(String[] args) {
              System.out.println("Answer: " + primePowerTriples());
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler087.java"
    performance: "~100ms"
  - language: "javascript"
    code: |
      function prime_power_triples() {
        const LIMIT = 50000000n;
        let max_prime = 0;
        while (BigInt(max_prime) * BigInt(max_prime) < LIMIT) max_prime++;
        max_prime--;
        const is_prime = new Array(max_prime + 1).fill(true);
        is_prime[0] = is_prime[1] = false;
        const primes = [];
        for (let i = 2; i <= max_prime; i++) {
          if (is_prime[i]) {
            primes.push(i);
            for (let j = i * i; j <= max_prime; j += i) {
              is_prime[j] = false;
            }
          }
        }
        const numbers = new Set();
        for (const p4 of primes) {
          const fourth = BigInt(p4) ** 4n;
          if (fourth >= LIMIT) break;
          for (const p3 of primes) {
            const cube = BigInt(p3) ** 3n;
            if (fourth + cube >= LIMIT) break;
            for (const p2 of primes) {
              const square = BigInt(p2) ** 2n;
              const sum = fourth + cube + square;
              if (sum >= LIMIT) break;
              numbers.add(sum);
            }
          }
        }
        return numbers.size;
      }

      module.exports = {
        answer: () => prime_power_triples()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution087.js"
    performance: "~200ms"
  - language: "python"
    code: |
      def solve():
          from math import sqrt
          limit = 50000000
          max_p2 = int(sqrt(limit))
          max_p3 = int(limit ** (1/3))
          max_p4 = int(limit ** (1/4))
          primes = []
          is_prime = [True] * (max_p2 + 1)
          is_prime[0] = is_prime[1] = False
          for i in range(2, max_p2 + 1):
              if is_prime[i]:
                  primes.append(i)
                  for j in range(i*i, max_p2 + 1, i):
                      is_prime[j] = False
          squares = [p*p for p in primes if p*p < limit]
          cubes = [p*p*p for p in primes if p*p*p < limit]
          fourths = [p*p*p*p for p in primes if p*p*p*p < limit]
          seen = set()
          for f in fourths:
              for c in cubes:
                  if f + c >= limit:
                      break
                  for s in squares:
                      num = f + c + s
                      if num >= limit:
                          break
                      seen.add(num)
          return len(seen)
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler087.py"
    performance: "~100ms"
  - language: "rust"
    code: |
      use std::collections::HashSet;

      pub fn prime_power_triples() -> usize {
          const LIMIT: usize = 50_000_000;
          let primes = sieve((LIMIT as f64).sqrt() as usize + 1);
          let mut sums = HashSet::new();
          for &p2 in &primes {
              let sq = p2 * p2;
              if sq >= LIMIT { break; }
              for &p3 in &primes {
                  let cb = p3 * p3 * p3;
                  if sq + cb >= LIMIT { break; }
                  for &p4 in &primes {
                      let fq = p4 * p4 * p4 * p4;
                      let sum = sq + cb + fq;
                      if sum >= LIMIT { break; }
                      sums.insert(sum);
                  }
              }
          }
          sums.len()
      }

      fn sieve(limit: usize) -> Vec<usize> {
          let mut is_prime = vec![true; limit + 1];
          is_prime[0] = false;
          if limit > 0 {
              is_prime[1] = false;
          }
          for i in 2..=((limit as f64).sqrt() as usize) {
              if is_prime[i] {
                  for j in (i * i..=limit).step_by(i) {
                      is_prime[j] = false;
                  }
              }
          }
          (2..=limit).filter(|&x| is_prime[x]).collect()
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler087.rs"
    performance: "~100ms"
tags: ["prime generation", "combinatorics", "set"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This problem asks to count distinct numbers below 50 million that can be written as p² + q³ + r⁴ where p, q, r are prime numbers. It involves generating primes and computing all possible combinations of prime powers that sum to less than the limit.

### Algorithm Analysis
Generate all primes up to √50M using sieve. Then use three nested loops over primes for squares, cubes, and fourth powers, computing sums and storing unique values in a set. Early termination when sums exceed the limit.

Time complexity: O(P³) where P is number of primes (~7000), but with early breaks it's much faster.
Space complexity: O(P) for primes list, O(N) for the set of sums where N is the count of unique numbers.

### Performance
Very fast across implementations (<200ms), as the nested loops are optimized with early exits and the number of primes is small.

### Key Insights
The key is to generate primes only once and use sets to handle duplicates automatically. The order of loops (fourth powers outermost) helps with early termination.

### Educational Value
Demonstrates efficient prime generation with sieve, combinatorial enumeration with early pruning, and the use of sets for uniqueness in counting problems.