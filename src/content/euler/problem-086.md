---
problemNumber: 86
title: "Cuboid route"
description: "A spider, S, sits in one corner of a cuboid room, measuring 6 by 5 by 3, and a fly, F, sits in the opposite corner. By travelling on the surfaces of the room the shortest \"straight line\" distance from S to F is 10 and the path is shown on the diagram.
\n
![Cuboid Path Diagram](/images/euler/0086_cuboid_route.png)
\nHowever, there are up to three \"shortest\" path candidates for any given cuboid and the shortest straight line distance is the shortest of these.\n\nFind the least value of M such that the number of cuboids with integer dimensions, up to M by M by M, with shortest path integer, first exceeds one million."
difficulty: "medium"
date: "2026-04-12"
technologies: ["brute force", "geometry", "pythagorean theorem"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <algorithm>
      #include <cmath>

      long long cuboid_route() {
          long long count = 0;
          int M = 0;
          const long long TARGET = 1000000;
          wile (count <= TARGET) {
              M++;
              long long current_count = 0;
              for (int a = 1; a <= M; ++a) {
                  for (int b = a; b <= M; ++b) {
                      int c = M;
                      long long p1 = (long long)(a + b) * (a + b) + (long long)c * c;
                      long long p2 = (long long)(a + c) * (a + c) + (long long)b * b;
                      long long p3 = (long long)(b + c) * (b + c) + (long long)a * a;
                      long long min_p = std::min({p1, p2, p3});
                      int root = (int)(std::sqrt(min_p) + 0.5);
                      if ((long long)root * root == min_p) {
                          current_count++;
                      }
                  }
              }
              count += current_count;
          }
          return M;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler086.cpp"
    performance: "~1000ms"
  - language: "go"
    code: |
      package main

      import (
          "math"
      )

      func cuboidRoute() int {
          count := 0
          M := 0
          const TARGET = 1000000
          for count <= TARGET {
              M++
              currentCount := 0
              for a := 1; a <= M; a++ {
                  for b := a; b <= M; b++ {
                      c := M
                      p1 := (a + b) * (a + b) + c * c
                      p2 := (a + c) * (a + c) + b * b
                      p3 := (b + c) * (b + c) + a * a
                      minP := int(math.Min(float64(p1), math.Min(float64(p2), float64(p3))))
                      root := int(math.Sqrt(float64(minP)) + 0.5)
                      if root*root == minP {
                          currentCount++
                      }
                  }
              }
              count += currentCount
          }
          return M
      }

      func main() {
          println("Answer:", cuboidRoute())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/src/euler086.go"
    performance: "~1000ms"
  - language: "java"
    code: |
      public class Euler086 {
          public static int cuboidRoute() {
              long count = 0;
              int M = 0;
              final long TARGET = 1000000;
              while (count <= TARGET) {
                  M++;
                  long currentCount = 0;
                  for (int a = 1; a <= M; a++) {
                      for (int b = a; b <= M; b++) {
                          int c = M;
                          long p1 = (long)(a + b) * (a + b) + (long)c * c;
                          long p2 = (long)(a + c) * (a + c) + (long)b * b;
                          long p3 = (long)(b + c) * (b + c) + (long)a * a;
                          long minP = Math.min(p1, Math.min(p2, p3));
                          int root = (int)(Math.sqrt(minP) + 0.5);
                          if ((long)root * root == minP) {
                              currentCount++;
                          }
                      }
                  }
                  count += currentCount;
              }
              return M;
          }

          public static void main(String[] args) {
              System.out.println("Answer: " + cuboidRoute());
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/Euler086.java"
    performance: "~1000ms"
  - language: "javascript"
    code: |
      function cuboid_route() {
        let count = 0;
        let M = 0;
        const TARGET = 1000000;
        while (count <= TARGET) {
          M++;
          let current_count = 0;
          for (let a = 1; a <= M; a++) {
            for (let b = a; b <= M; b++) {
              const c = M;
              const p1 = (a + b) * (a + b) + c * c;
              const p2 = (a + c) * (a + c) + b * b;
              const p3 = (b + c) * (b + c) + a * a;
              const min_p = Math.min(p1, p2, p3);
              const root = Math.round(Math.sqrt(min_p));
              if (root * root === min_p) {
                current_count++;
              }
            }
          }
          count += current_count;
        }
        return M;
      }

      module.exports = {
        answer: () => cuboid_route()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution086.js"
    performance: "~2000ms"
  - language: "python"
    code: |
      from math import isqrt

      def solve():
          count = 0
          M = 0
          TARGET = 1000000
          while count <= TARGET:
              M += 1
              current_count = 0
              for a in range(1, M + 1):
                  for b in range(a, M + 1):
                      p1 = (a + b) * (a + b) + M * M
                      p2 = (a + M) * (a + M) + b * b
                      p3 = (b + M) * (b + M) + a * a
                      min_p = min(p1, p2, p3)
                      root = isqrt(min_p)
                      if root * root == min_p:
                          current_count += 1
              count += current_count
          return M
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler086.py"
    performance: "~5000ms"
  - language: "rust"
    code: |
      pub fn cuboid_route() -> usize {
          let mut count = 0;
          let mut m = 1;
          loop {
              for a in 1..=m {
                  for b in a..=m {
                      let c = m;
                      let p1 = ((a + b) as f64).hypot(c as f64);
                      let p2 = ((a + c) as f64).hypot(b as f64);
                      let p3 = ((b + c) as f64).hypot(a as f64);
                      let min_path = p1.min(p2).min(p3);
                      if min_path == min_path.round() {
                          count += 1;
                      }
                  }
              }
              if count > 1_000_000 {
                  return m;
              }
              m += 1;
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler086.rs"
    performance: "~1000ms"
tags: ["geometry", "pythagorean", "brute force", "cuboid"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
In a cuboid with dimensions a×b×c, the shortest path between opposite corners along the surface can take three possible routes, each forming a right triangle with legs equal to sums of dimensions and the height equal to the remaining dimension. The shortest straight-line distance is the minimum of these three paths.

### Algorithm Analysis
Iterative search over increasing M, counting cuboids a≤b≤c=M where the minimum path squared is a perfect square. Uses nested loops over dimensions and integer square root checks.

Time complexity: O(M³) due to triple nested loops up to M.
Space complexity: O(1), only tracking counts.

### Performance
Moderate performance: C++/Go/Java (~1000ms), Rust (~1000ms), JavaScript (~2000ms), Python (~5000ms). The cubic complexity makes it slower for larger M.

### Key Insights
The problem reduces to finding when the minimum of three expressions (a+b)²+c², (a+c)²+b², (b+c)²+a² is a perfect square. M=1818 gives over 1 million such cuboids.

### Educational Value
Combines geometry, number theory (perfect squares), and optimization, showing how 3D spatial problems can be solved with computational brute force.
