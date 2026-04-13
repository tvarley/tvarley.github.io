---
problemNumber: 85
title: "Counting Rectangles"
description: "By counting carefully it can be seen that a rectangular grid measuring 3 by 2 contains eighteen rectangles:\n\nAlthough there exists no rectangular grid that contains exactly two million rectangles, find the area of the grid with the nearest solution."
difficulty: "easy"
date: "2026-04-12"
technologies: ["brute force", "mathematics"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <cmath>
      #include <climits>

      int counting_rectangles() {
          long long target = 2000000;
          long long min_diff = LLONG_MAX;
          int best_area = 0;
          for (int m = 1; m <= 2000; ++m) {
              for (int n = 1; n <= 2000; ++n) {
                  long long rect = (long long)m * (m + 1) / 2 * n * (n + 1) / 2;
                  long long diff = std::abs(rect - target);
                  if (diff < min_diff) {
                      min_diff = diff;
                      best_area = m * n;
                  }
              }
          }
          return best_area;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler085.cpp"
    performance: "~10ms"
  - language: "go"
    code: |
      package main

      import (
          "math"
      )

      func countingRectangles() int {
          target := 2000000
          minDiff := math.MaxInt64
          bestArea := 0
          for m := 1; m <= 2000; m++ {
              for n := 1; n <= 2000; n++ {
                  rect := int64(m) * int64(m+1) / 2 * int64(n) * int64(n+1) / 2
                  diff := int(math.Abs(float64(rect - int64(target))))
                  if diff < minDiff {
                      minDiff = diff
                      bestArea = m * n
                  }
              }
          }
          return bestArea
      }

      func main() {
          println("Answer:", countingRectangles())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler085.go"
    performance: "~10ms"
  - language: "java"
    code: |
      public class Euler085 {
          public static int countingRectangles() {
              long target = 2000000;
              long minDiff = Long.MAX_VALUE;
              int bestArea = 0;
              for (int m = 1; m <= 2000; m++) {
                  for (int n = 1; n <= 2000; n++) {
                      long rect = (long) m * (m + 1) / 2 * n * (n + 1) / 2;
                      long diff = Math.abs(rect - target);
                      if (diff < minDiff) {
                          minDiff = diff;
                          bestArea = m * n;
                      }
                  }
              }
              return bestArea;
          }

          public static void main(String[] args) {
              System.out.println("Answer: " + countingRectangles());
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler085.java"
    performance: "~10ms"
  - language: "javascript"
    code: |
      function countingRectangles() {
        const target = 2000000n;
        let minDiff = target;
        let bestArea = 0;
        for (let m = 1; m <= 2000; m++) {
          for (let n = 1; n <= 2000; n++) {
            const rect = (BigInt(m) * BigInt(m + 1) / 2n) * (BigInt(n) * BigInt(n + 1) / 2n);
            const diff = rect > target ? rect - target : target - rect;
            if (diff < minDiff) {
              minDiff = diff;
              bestArea = m * n;
            }
          }
        }
        return bestArea;
      }

      module.exports = {
        answer: () => countingRectangles()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution085.js"
    performance: "~100ms"
  - language: "python"
    code: |
      def solve():
          target = 2000000
          min_diff = float('inf')
          best_area = 0
          for m in range(1, 100):
              for n in range(1, 100):
                  rects = m * (m + 1) * n * (n + 1) // 4
                  diff = abs(rects - target)
                  if diff < min_diff:
                      min_diff = diff
                      best_area = m * n
          return best_area
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler085.py"
    performance: "~1ms"
  - language: "rust"
    code: |
      pub fn counting_rectangles() -> u64 {
          const TARGET: u64 = 2_000_000;
          let mut min_diff = u64::MAX;
          let mut best_area = 0;
          for w in 1..100 {
              for h in 1..100 {
                  let rects = (w * (w + 1) * h * (h + 1)) / 4;
                  let diff = (rects as i64 - TARGET as i64).abs() as u64;
                  if diff < min_diff {
                      min_diff = diff;
                      best_area = w * h;
                  }
              }
          }
          best_area
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler085.rs"
    performance: "~1ms"
tags: ["brute force", "combinatorics", "grid"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
A grid of m by n points contains rectangles formed by choosing 2 horizontal lines from m+1 possible and 2 vertical lines from n+1 possible. The number of rectangles is C(m+1,2) * C(n+1,2) = [m(m+1)/2] * [n(n+1)/2].

### Algorithm Analysis
Brute force search over possible m,n dimensions (up to 2000) to find the combination where rectangle count is closest to 2,000,000. Uses the triangle number formula for efficiency.

Time complexity: O(M*N) where M=N=2000, very fast due to small constants.
Space complexity: O(1), only tracking minimum difference and best area.

### Performance
Extremely fast across all implementations (<100ms), as the nested loops are small and computation is simple.

### Key Insights
The optimal grid dimensions are around 36x77 or similar, giving area 2772 with rectangle count very close to 2 million.

### Educational Value
Demonstrates how combinatorial formulas can be used to count geometric objects in grids, and how brute force can efficiently solve optimization problems with bounded search spaces.