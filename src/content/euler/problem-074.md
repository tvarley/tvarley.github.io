---
problemNumber: 74
title: Digit Factorial Chains
description: |
  The number $145$ is well known for the property that the sum of the factorial of its digits is equal to $145$:
  $$1! + 4! + 5! = 1 + 24 + 120 = 145.$$

  Perhaps less well known is $169$, in that it produces the longest chain of numbers that link back to $169$; it turns out that there are only three such loops that exist:
  $$\begin{align}
  &169 \to 363601 \to 1454 \to 169\\
  &871 \to 45361 \to 871\\
  &872 \to 45362 \to 872
  \end{align}$$

  It is not difficult to prove that EVERY starting number will eventually get stuck in a loop. For example,
  $$\begin{align}
  &69 \to 363600 \to 1454 \to 169 \to 363601 (\to 1454)\\
  &78 \to 45360 \to 871 \to 45361 (\to 871)\\
  &540 \to 145 (\to 145)
  \end{align}$$

  Starting with $69$ produces a chain of five non-repeating terms, but the longest non-repeating chain with a starting number below one million is sixty terms.

  How many chains, with a starting number below one million, contain exactly sixty non-repeating terms?
difficulty: easy
date: 2004-07-16
technologies: [cpp, java, javascript, python, go, rust]
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <set>

      int fact[10] = {1,1,2,6,24,120,720,5040,40320,362880};

      int digit_fact_sum(int n)
      {
          int sum = 0;
          while(n > 0){
              sum += fact[n % 10];
              n /= 10;
          }
          return sum;
      }

      int digit_factorial_chains()
      {
          int count = 0;
          for(int i=1; i<1000000; i++){
              std::set<int> seen;
              int n = i;
              while(seen.find(n) == seen.end()){
                  seen.insert(n);
                  n = digit_fact_sum(n);
              }
              if(seen.size() == 60){
                  count++;
              }
          }
          return count;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[])
      {
          std::cout << "Answer: " << digit_factorial_chains() << std::endl;
      }
      #endif // #if ! defined UNITTEST_MODE
    githubLink: https://github.com/tvarley/euler/blob/main/cpp/src/euler074.cpp
    performance: O(N) time, O(1) space per chain (set tracks seen numbers)
  - language: java
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.util.HashSet;
      import java.util.Set;

      public class Solution074 implements Solution {
        private static final int[] FACT = {1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880};

        private static int digitFactSum(int n) {
          int sum = 0;
          while (n > 0) {
            sum += FACT[n % 10];
            n /= 10;
          }
          return sum;
        }

        public String solve() {
          int count = 0;
          for (int i = 1; i < 1000000; i++) {
            Set<Integer> seen = new HashSet<>();
            int n = i;
            while (!seen.contains(n)) {
              seen.add(n);
              n = digitFactSum(n);
            }
            if (seen.size() == 60) {
              count++;
            }
          }
          return String.valueOf(count);
        }
      }
    githubLink: https://github.com/tvarley/euler/blob/main/java/src/main/java/org/tvarley/euler/solutions/Solution074.java
    performance: O(N) time, O(1) space per chain (HashSet tracks seen numbers)
  - language: javascript
    code: |
      const FACT = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];

      function digitFactSum(n) {
        let sum = 0;
        while (n > 0) {
          sum += FACT[n % 10];
          n = Math.floor(n / 10);
        }
        return sum;
      }

      function digitFactorialChains() {
        let count = 0;
        for (let i = 1; i < 1000000; i++) {
          const seen = new Set();
          let n = i;
          while (!seen.has(n)) {
            seen.add(n);
            n = digitFactSum(n);
          }
          if (seen.size === 60) {
            count++;
          }
        }
        return count;
      }

      module.exports = {
        answer: () => digitFactorialChains()
      };
    githubLink: https://github.com/tvarley/euler/blob/main/javascript/src/euler/solution074.js
    performance: O(N) time, O(1) space per chain (Set tracks seen numbers)
  - language: python
    code: |
      FACT = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880]

      def digit_fact_sum(n):
          total = 0
          while n > 0:
              total += FACT[n % 10]
              n //= 10
          return total

      def solve():
          count = 0
          for i in range(1, 1000000):
              seen = set()
              n = i
              while n not in seen:
                  seen.add(n)
                  n = digit_fact_sum(n)
              if len(seen) == 60:
                  count += 1
          return count
    githubLink: https://github.com/tvarley/euler/blob/main/python/src/euler074.py
    performance: O(N) time, O(1) space per chain (set tracks seen numbers)
  - language: go
    code: |
      package main

      import (
      	"fmt"
      )

      var fact = [10]int{1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880}

      func digitFactSum(n int) int {
      	sum := 0
      	for n > 0 {
      		sum += fact[n%10]
      		n /= 10
      	}
      	return sum
      }

      func digitFactorialChains() int {
      	count := 0
      	for i := 1; i < 1000000; i++ {
      		seen := make(map[int]bool)
      		n := i
      		for !seen[n] {
      			seen[n] = true
      			n = digitFactSum(n)
      		}
      		if len(seen) == 60 {
      			count++
      		}
      	}
      	return count
      }

      func main() {
      	fmt.Println(digitFactorialChains())
      }
    githubLink: https://github.com/tvarley/euler/blob/main/go/euler074.go
    performance: O(N) time, O(1) space per chain (map tracks seen numbers)
  - language: rust
    code: |
      static FACT: [u64; 10] = [1, 1, 2, 6, 24, 120, 720, 5040, 40320, 362880];

      fn digit_fact_sum(mut n: u64) -> u64 {
          let mut sum = 0;
          while n > 0 {
              sum += FACT[(n % 10) as usize];
              n /= 10;
          }
          sum
      }

      pub fn digit_factorial_chains() -> u64 {
          let mut count = 0;
          for i in 1..1_000_000 {
              let mut seen = std::collections::HashSet::new();
              let mut n = i;
              while !seen.contains(&n) {
                  seen.insert(n);
                  n = digit_fact_sum(n);
              }
              if seen.len() == 60 {
                  count += 1;
              }
          }
          count
      }
    githubLink: https://github.com/tvarley/euler/blob/main/rust/src/euler074.rs
    performance: O(N) time, O(1) space per chain (HashSet tracks seen numbers)
tags: [factorial, digit-manipulation, chains, number-theory]
featured: false
showcase: false
solutionNotes: |
  ## Mathematical Background
  This problem involves chains formed by summing the factorial of digits. Each number maps to the sum of factorials of its digits, creating chains that eventually cycle. The problem asks for numbers below 1,000,000 that produce exactly 60 distinct terms in their chain.

  ## Algorithm Overview
  For each starting number from 1 to 999,999, follow the chain by repeatedly summing digit factorials until a cycle is detected. Count the unique numbers in the chain and check if the count equals 60.

  ## Performance Analysis
  Time complexity is O(N × L) where L is the maximum chain length (typically small due to factorial limits). Space complexity is O(L) per chain. Most implementations run in under 30 seconds on modern hardware.

  ## Key Insights
  There are 402 such numbers. The longest chains occur with numbers that produce long sequences before cycling back. Memoization could optimize repeated calculations.

  ## Educational Value
  This problem demonstrates functional graphs and cycle detection in number sequences. It connects digit manipulation with graph theory concepts.
---</content>
<parameter name="file_path">tvarley.github.io/src/content/euler/problem-074.md