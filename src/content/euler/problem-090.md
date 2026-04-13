---
problemNumber: 90
title: "Cube digit pairs"
description: "Count distinct pairs of 6-sided cubes (digits 0-9) that can form all 2-digit squares (01..81)."
difficulty: "medium"
date: "2024-04-12"
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>

      bool has_digit(int mask, int d) {
          if (mask & (1 << d)) return true;
          if (d == 6 && (mask & (1 << 9))) return true;
          if (d == 9 && (mask & (1 << 6))) return true;
          return false;
      }

      bool can_form_square(int mask_a, int mask_b, int sq) {
          int d1 = sq / 10, d2 = sq % 10;
          bool a1 = has_digit(mask_a, d1), a2 = has_digit(mask_a, d2);
          bool b1 = has_digit(mask_b, d1), b2 = has_digit(mask_b, d2);
          return (a1 && b2) || (a2 && b1);
      }

      long long cube_digit_pairs() {
          std::vector<int> squares = {1, 4, 9, 16, 25, 36, 49, 64, 81};
          std::vector<int> cubes;
          for (int i = 0; i < (1 << 10); ++i) {
              if (__builtin_popcount(i) == 6) {
                  cubes.push_back(i);
              }
          }
          long long count = 0;
          int n = cubes.size();
          for (int i = 0; i < n; ++i) {
              int ma = cubes[i];
              for (int j = i + 1; j < n; ++j) {
                  int mb = cubes[j];
                  bool ok = true;
                  for (int sq : squares) {
                      if (!can_form_square(ma, mb, sq)) {
                          ok = false;
                          break;
                      }
                  }
                  if (ok) ++count;
              }
          }
          return count;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler090.cpp"
    performance: "~10ms"
  - language: "go"
    code: |
      package main

      func hasDigit(mask, d int) bool {
          if (mask & (1 << uint(d))) != 0 {
              return true
          }
          if d == 6 && (mask & (1 << uint(9))) != 0 {
              return true
          }
          if d == 9 && (mask & (1 << uint(6))) != 0 {
              return true
          }
          return false
      }

      func canFormSquare(maskA, maskB, sq int) bool {
          d1 := sq / 10
          d2 := sq % 10
          a1 := hasDigit(maskA, d1)
          a2 := hasDigit(maskA, d2)
          b1 := hasDigit(maskB, d1)
          b2 := hasDigit(maskB, d2)
          return (a1 && b2) || (a2 && b1)
      }

      func cubeDigitPairs() int {
          squares := []int{1, 4, 9, 16, 25, 36, 49, 64, 81}
          var cubes []int
          for i := 0; i < (1 << 10); i++ {
              count := 0
              for j := 0; j < 10; j++ {
                  if (i & (1 << uint(j))) != 0 {
                      count++
                  }
              }
              if count == 6 {
                  cubes = append(cubes, i)
              }
          }
          count := 0
          n := len(cubes)
          for i := 0; i < n; i++ {
              ma := cubes[i]
              for j := i + 1; j < n; j++ {
                  mb := cubes[j]
                  ok := true
                  for _, sq := range squares {
                      if !canFormSquare(ma, mb, sq) {
                          ok = false
                          break
                      }
                  }
                  if ok {
                      count++
                  }
              }
          }
          return count
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler090.cpp"
    performance: "~10ms"
  - language: "java"
    code: |
      public class Euler090 {
          static boolean hasDigit(int mask, int d) {
              if ((mask & (1 << d)) != 0) return true;
              if (d == 6 && (mask & (1 << 9)) != 0) return true;
              if (d == 9 && (mask & (1 << 6)) != 0) return true;
              return false;
          }

          static boolean canFormSquare(int maskA, int maskB, int sq) {
              int d1 = sq / 10, d2 = sq % 10;
              boolean a1 = hasDigit(maskA, d1), a2 = hasDigit(maskA, d2);
              boolean b1 = hasDigit(maskB, d1), b2 = hasDigit(maskB, d2);
              return (a1 && b2) || (a2 && b1);
          }

          static long cubeDigitPairs() {
              int[] squares = {1, 4, 9, 16, 25, 36, 49, 64, 81};
              java.util.List<Integer> cubes = new java.util.ArrayList<>();
              for (int i = 0; i < (1 << 10); i++) {
                  int count = 0;
                  for (int j = 0; j < 10; j++) {
                      if ((i & (1 << j)) != 0) count++;
                  }
                  if (count == 6) cubes.add(i);
              }
              long count = 0;
              int n = cubes.size();
              for (int i = 0; i < n; i++) {
                  int ma = cubes.get(i);
                  for (int j = i + 1; j < n; j++) {
                      int mb = cubes.get(j);
                      boolean ok = true;
                      for (int sq : squares) {
                          if (!canFormSquare(ma, mb, sq)) {
                              ok = false;
                              break;
                          }
                      }
                      if (ok) count++;
                  }
              }
              return count;
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler090.cpp"
    performance: "~10ms"
  - language: "javascript"
    code: |
      function has_digit(mask, d) {
        if (mask & (1 << d)) return true;
        if (d === 6 && (mask & (1 << 9))) return true;
        if (d === 9 && (mask & (1 << 6))) return true;
        return false;
      }

      function can_form_square(mask_a, mask_b, sq) {
        const d1 = Math.floor(sq / 10), d2 = sq % 10;
        const a1 = has_digit(mask_a, d1), a2 = has_digit(mask_a, d2);
        const b1 = has_digit(mask_b, d1), b2 = has_digit(mask_b, d2);
        return (a1 && b2) || (a2 && b1);
      }

      function cube_digit_pairs() {
        const squares = [1, 4, 9, 16, 25, 36, 49, 64, 81];
        const cubes = [];
        for (let i = 0; i < (1 << 10); i++) {
          let count = 0;
          for (let j = 0; j < 10; j++) {
            if (i & (1 << j)) count++;
          }
          if (count === 6) cubes.push(i);
        }
        let count = 0;
        const n = cubes.length;
        for (let i = 0; i < n; i++) {
          const ma = cubes[i];
          for (let j = i + 1; j < n; j++) {
            const mb = cubes[j];
            let ok = true;
            for (const sq of squares) {
              if (!can_form_square(ma, mb, sq)) {
                ok = false;
                break;
              }
            }
            if (ok) count++;
          }
        }
        return count;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution090.js"
    performance: "~100ms"
  - language: "python"
    code: |
      def has_digit(cube, d):
          if d in cube:
              return True
          if d == 6 and 9 in cube:
              return True
          if d == 9 and 6 in cube:
              return True
          return False

      def solve():
          from itertools import combinations
          squares = [1, 4, 9, 16, 25, 36, 49, 64, 81]
          digits = list(range(10))
          cubes = list(combinations(digits, 6))
          count = 0
          n = len(cubes)
          for i in range(n):
              for j in range(i + 1, n):
                  cube1, cube2 = cubes[i], cubes[j]
                  ok = True
                  for sq in squares:
                      d1, d2 = sq // 10, sq % 10
                      can = (has_digit(cube1, d1) and has_digit(cube2, d2)) or \
                            (has_digit(cube1, d2) and has_digit(cube2, d1))
                      if not can:
                          ok = False
                          break
                  if ok:
                      count += 1
          return count
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler090.py"
    performance: "~10ms"
  - language: "rust"
    code: |
      pub fn cube_digit_pairs() -> usize {
          let squares = vec![1, 4, 9, 16, 25, 36, 49, 64, 81];
          let mut cubes = vec![];
          for i in 0u32..(1 << 10) {
              if i.count_ones() == 6 {
                  cubes.push(i as usize);
              }
          }
          let mut count = 0;
          let n = cubes.len();
          for i in 0..n {
              let ma = cubes[i];
              for j in i + 1..n {
                  let mb = cubes[j];
                  let mut ok = true;
                  for &sq in &squares {
                      if !can_form_square(ma, mb, sq) {
                          ok = false;
                          break;
                      }
                  }
                  if ok {
                      count += 1;
                  }
              }
          }
          count
      }

      fn has_digit(mask: usize, d: usize) -> bool {
          if (mask & (1 << d)) != 0 {
              return true;
          }
          if d == 6 && (mask & (1 << 9)) != 0 {
              return true;
          }
          if d == 9 && (mask & (1 << 6)) != 0 {
              return true;
          }
          false
      }

      fn can_form_square(mask_a: usize, mask_b: usize, sq: usize) -> bool {
          let d1 = sq / 10;
          let d2 = sq % 10;
          let a1 = has_digit(mask_a, d1);
          let a2 = has_digit(mask_a, d2);
          let b1 = has_digit(mask_b, d1);
          let b2 = has_digit(mask_b, d2);
          (a1 && b2) || (a2 && b1)
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler090.rs"
    performance: "~10ms"
tags: ["combinatorics", "bit manipulation", "cubes"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This problem involves finding pairs of cubes with digits 0-9 that can form all two-digit square numbers (01 through 81) by arranging the cubes side by side. The cubes have 6 faces each, and digits 6 and 9 are considered interchangeable since they can be rotated.

### Algorithm Analysis
The solution generates all possible combinations of 6 digits from 10 (C(10,6) = 210) for each cube using bitmasks or combinations. It then checks all unordered pairs to see if they can form each required square by ensuring the digits are available on either cube in the correct positions.

### Performance
All implementations run efficiently in under 100ms, with the combinatorial approach being fast due to the small number of combinations.

### Key Insights
- Bitmasks provide efficient digit checking and storage.
- Handling 6/9 interchangeability is crucial for covering squares like 09 and 90.
- The problem requires checking both possible arrangements for each square digit pair.

### Educational Value
Demonstrates combinatorial enumeration and bit manipulation techniques, with a practical application to puzzle-solving and constraint satisfaction.