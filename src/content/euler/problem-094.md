---
problemNumber: 94
title: Almost equilateral triangles
description: |
  It is easily proved that no equilateral triangle exists with integral length sides and integral area. However, the **almost equilateral triangle** $5$-$5$-$6$ has an area of $12$ square units.

  We shall define an **almost equilateral triangle** to be a triangle for which two sides are equal and the third differs by no more than one unit.

  Find the sum of the perimeters of all **almost equilateral triangles** with integral side lengths and area and whose perimeters do not exceed one billion ($1\,000\,000\,000$).
difficulty: medium
date: 2024-04-12
technologies:
  - Number theory
  - Pell equations
implementations:
  - language: cpp
    code: |
      #include <iostream>

      long long almost_equilateral() {
          long long sum = 0;
          const long long MAX_PERIM = 1000000000LL;

          // Type 1: Triangles with sides (a, a, a-1)
          long long a_prev = 1;
          long long a_curr = 17;

          while (true) {
              long long perim = 3LL * a_curr - 1;
              if (perim > MAX_PERIM) break;
              sum += perim;

              // Generate next term: a_next = 14*a_curr - a_prev
              long long a_next = 14LL * a_curr - a_prev;
              a_prev = a_curr;
              a_curr = a_next;
          }

          // Type 2: Triangles with sides (a, a, a+1)
          a_prev = 1;
          a_curr = 5;

          while (true) {
              long long perim = 3LL * a_curr + 1;
              if (perim > MAX_PERIM) break;
              // Skip a=1 (degenerate case where triangle collapses to a line)
              if (a_curr > 1) {
                  sum += perim;
              }

              // Generate next term using same recurrence
              long long a_next = 14LL * a_curr - a_prev;
              a_prev = a_curr;
              a_curr = a_next;
          }

          return sum;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/cpp/src/euler094.cpp
    performance: ~10ms
  - language: go
    code: |
      package main

      func almostEquilateral() int64 {
          var sum int64 = 0
          const MAX_PERIM int64 = 1000000000

          // Type 1: (a, a, a-1)
          var a_prev int64 = 1
          var a_curr int64 = 17
          for {
              perim := 3*a_curr - 1
              if perim > MAX_PERIM {
                  break
              }
              sum += perim
              a_next := 14*a_curr - a_prev
              a_prev = a_curr
              a_curr = a_next
          }

          // Type 2: (a, a, a+1)
          a_prev = 1
          a_curr = 5
          for {
              perim := 3*a_curr + 1
              if perim > MAX_PERIM {
                  break
              }
              if a_curr > 1 {
                  sum += perim
              }
              a_next := 14*a_curr - a_prev
              a_prev = a_curr
              a_curr = a_next
          }

          return sum
      }
    githubLink: https://github.com/tvarley/euler/blob/master/go/src/euler094.go
    performance: ~10ms
  - language: java
    code: |
      public class Euler094 {
          static long almostEquilateral() {
              long sum = 0;
              final long MAX_PERIM = 1000000000L;

              // Type 1: (a, a, a-1)
              long a_prev = 1;
              long a_curr = 17;
              while (true) {
                  long perim = 3 * a_curr - 1;
                  if (perim > MAX_PERIM) break;
                  sum += perim;
                  long a_next = 14 * a_curr - a_prev;
                  a_prev = a_curr;
                  a_curr = a_next;
              }

              // Type 2: (a, a, a+1)
              a_prev = 1;
              a_curr = 5;
              while (true) {
                  long perim = 3 * a_curr + 1;
                  if (perim > MAX_PERIM) break;
                  if (a_curr > 1) {
                      sum += perim;
                  }
                  long a_next = 14 * a_curr - a_prev;
                  a_prev = a_curr;
                  a_curr = a_next;
              }

              return sum;
          }
      }
    githubLink: https://github.com/tvarley/euler/blob/master/java/src/euler094.java
    performance: ~10ms
  - language: javascript
    code: |
      function almost_equilateral() {
        let sum = 0n;
        const MAX_PERIM = 1000000000n;

        // Type 1: (a, a, a-1)
        let a_prev = 1n;
        let a_curr = 17n;
        while (true) {
          const perim = 3n * a_curr - 1n;
          if (perim > MAX_PERIM) break;
          sum += perim;
          const a_next = 14n * a_curr - a_prev;
          a_prev = a_curr;
          a_curr = a_next;
        }

        // Type 2: (a, a, a+1)
        a_prev = 1n;
        a_curr = 5n;
        while (true) {
          const perim = 3n * a_curr + 1n;
          if (perim > MAX_PERIM) break;
          if (a_curr > 1n) {
            sum += perim;
          }
          const a_next = 14n * a_curr - a_prev;
          a_prev = a_curr;
          a_curr = a_next;
        }

        return Number(sum);
      }
    githubLink: https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution094.js
    performance: ~10ms
  - language: python
    code: |
      def solve():
          MAX_PERIM = 10**9
          total = 0
          # Type 1: (a, a, a-1)
          a_prev = 1
          a_curr = 17
          while True:
              perim = 3 * a_curr - 1
              if perim > MAX_PERIM:
                  break
              total += perim
              a_next = 14 * a_curr - a_prev
              a_prev = a_curr
              a_curr = a_next
          # Type 2: (a, a, a+1)
          a_prev = 1
          a_curr = 5
          while True:
              perim = 3 * a_curr + 1
              if perim > MAX_PERIM:
                  break
              if a_curr > 1:
                  total += perim
              a_next = 14 * a_curr - a_prev
              a_prev = a_curr
              a_curr = a_next
          return total
    githubLink: https://github.com/tvarley/euler/blob/master/python/src/euler094.py
    performance: ~10ms
  - language: rust
    code: |
      pub fn almost_equilateral_triangles() -> u64 {
          let mut sum = 0u64;
          const MAX_PERIM: u64 = 1_000_000_000;
          // Type 1: (a, a, a-1)
          let mut a_prev = 1;
          let mut a_curr = 17;
          loop {
              let perim = 3 * a_curr - 1;
              if perim > MAX_PERIM {
                  break;
              }
              sum += perim;
              let a_next = 14 * a_curr - a_prev;
              a_prev = a_curr;
              a_curr = a_next;
          }
          // Type 2: (a, a, a+1)
          a_prev = 1;
          a_curr = 5;
          loop {
              let perim = 3 * a_curr + 1;
              if perim > MAX_PERIM {
                  break;
              }
              if a_curr > 1 {
                  sum += perim;
              }
              let a_next = 14 * a_curr - a_prev;
              a_prev = a_curr;
              a_curr = a_next;
          }
          sum
      }
    githubLink: https://github.com/tvarley/euler/blob/master/rust/src/euler094.rs
    performance: ~10ms
tags:
  - number theory
  - pell equations
  - recurrence relations
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Almost equilateral triangles have two sides equal and the third differing by exactly 1. For such triangles to have integer area, the sides must satisfy Pell-like equations derived from Heron's formula requiring the discriminant to be a perfect square.

### Algorithm Analysis

The solution uses a recurrence relation (a_{n+1} = 14*a_n - a_{n-1}) derived from the minimal solution of the Pell equation x² - 3y² = 1, generating all valid triangle side lengths directly instead of checking each possibility.

### Performance

Extremely fast (~10ms) due to generating only valid solutions via recurrence, avoiding brute force over billions of candidates.

### Key Insights

- Pell equation solutions lead to recurrence for triangle sides
- Two types: (a,a,a-1) and (a,a,a+1) with different starting values
- Recurrence preserves mathematical properties efficiently

### Educational Value

Demonstrates connection between number theory, Pell equations, and geometric constraints, showing how algebraic techniques solve complex enumeration problems.