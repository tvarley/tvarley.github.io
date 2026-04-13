---
problemNumber: 91
title: "Right triangles with integer coordinates"
description: "The points P (x1, y1) and Q (x2, y2) are plotted at integer co-ordinates and are joined to the origin, O(0,0), to form ΔOPQ. There are exactly fourteen triangles containing a right angle that can be formed when each co-ordinate lies between 0 and 2 inclusive; that is, 0 ≤ x1, y1, x2, y2 ≤ 2. Given that 0 ≤ x1, y1, x2, y2 ≤ 50, how many right triangles can be formed?"
difficulty: "medium"
date: "2024-04-12"
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>

      unsigned int gcd(unsigned int a, unsigned int b) {
          while (a != 0) {
              unsigned int c = a;
              a = b % a;
              b = c;
          }
          return b;
      }

      long long right_triangles() {
          const unsigned int size = 50;
          long long result = 3LL * size * size;  // origin + x-axis + y-axis

          // right angle at interior point P(px, py); uses GCD to step through valid Q points where PO·PQ = 0
          // only iterates bottom triangle (py <= px) and doubles count for symmetry (except diagonal)
          for (unsigned int px = 1; px <= size; ++px) {
              for (unsigned int py = 1; py <= px; ++py) {
                  unsigned int factor = gcd(px, py);
                  unsigned int dx = px / factor;
                  unsigned int dy = py / factor;

                  unsigned int found = 0;

                  // Q below P
                  int qx = static_cast<int>(px) - dy;
                  int qy = static_cast<int>(py) + dx;
                  while (qx >= 0 && qy <= static_cast<int>(size)) {
                      ++found;
                      qx -= dy;
                      qy += dx;
                  }

                  // Q above P
                  qx = static_cast<int>(px) + dy;
                  qy = static_cast<int>(py) - dx;
                  while (qy >= 0 && qx <= static_cast<int>(size)) {
                      ++found;
                      qx += dy;
                      qy -= dx;
                  }

                  if (px != py) found *= 2;
                  result += found;
              }
          }
          return result;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler091.cpp"
    performance: "~10ms"
  - language: "go"
    code: |
      package main

      func gcd(a, b uint) uint {
          for a != 0 {
              c := a
              a = b % a
              b = c
          }
          return b
      }

      func rightTriangles() int {
          const size = 50
          result := 3 * size * size
          for px := uint(1); px <= size; px++ {
              for py := uint(1); py <= px; py++ {
                  factor := gcd(px, py)
                  dx := px / factor
                  dy := py / factor
                  found := uint(0)
                  // Q below P
                  qx := int(px) - int(dy)
                  qy := int(py) + int(dx)
                  for qx >= 0 && qy <= size {
                      found++
                      qx -= int(dy)
                      qy += int(dx)
                  }
                  // Q above P
                  qx = int(px) + int(dy)
                  qy = int(py) - int(dx)
                  for qy >= 0 && qx <= size {
                      found++
                      qx += int(dy)
                      qy -= int(dx)
                  }
                  if px != py {
                      found *= 2
                  }
                  result += int(found)
              }
          }
          return result
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler091.cpp"
    performance: "~10ms"
  - language: "java"
    code: |
      public class Euler091 {
          static int gcd(int a, int b) {
              while (a != 0) {
                  int c = a;
                  a = b % a;
                  b = c;
              }
              return b;
          }

          static long rightTriangles() {
              final int size = 50;
              long result = 3L * size * size;
              for (int px = 1; px <= size; px++) {
                  for (int py = 1; py <= px; py++) {
                      int factor = gcd(px, py);
                      int dx = px / factor;
                      int dy = py / factor;
                      int found = 0;
                      // Q below P
                      int qx = px - dy;
                      int qy = py + dx;
                      while (qx >= 0 && qy <= size) {
                          found++;
                          qx -= dy;
                          qy += dx;
                      }
                      // Q above P
                      qx = px + dy;
                      qy = py - dx;
                      while (qy >= 0 && qx <= size) {
                          found++;
                          qx += dy;
                          qy -= dx;
                      }
                      if (px != py) found *= 2;
                      result += found;
                  }
              }
              return result;
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler091.cpp"
    performance: "~10ms"
  - language: "javascript"
    code: |
      function gcd(a, b) {
        while (a !== 0) {
          const c = a;
          a = b % a;
          b = c;
        }
        return b;
      }

      function right_triangles() {
        const size = 50;
        let result = 3 * size * size;
        for (let px = 1; px <= size; px++) {
          for (let py = 1; py <= px; py++) {
            const factor = gcd(px, py);
            const dx = px / factor;
            const dy = py / factor;
            let found = 0;
            // Q below
            let qx = px - dy;
            let qy = py + dx;
            while (qx >= 0 && qy <= size) {
              found++;
              qx -= dy;
              qy += dx;
            }
            // Q above
            qx = px + dy;
            qy = py - dx;
            while (qy >= 0 && qx <= size) {
              found++;
              qx += dy;
              qy -= dx;
            }
            if (px !== py) found *= 2;
            result += found;
          }
        }
        return result;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution091.js"
    performance: "~10ms"
  - language: "python"
    code: |
      def gcd(a, b):
          while a:
              a, b = b % a, a
          return b

      def right_triangles():
          size = 50
          result = 3 * size * size
          for px in range(1, size + 1):
              for py in range(1, px + 1):
                  factor = gcd(px, py)
                  dx = px // factor
                  dy = py // factor
                  found = 0
                  # Q below P
                  qx = px - dy
                  qy = py + dx
                  while qx >= 0 and qy <= size:
                      found += 1
                      qx -= dy
                      qy += dx
                  # Q above P
                  qx = px + dy
                  qy = py - dx
                  while qy >= 0 and qx <= size:
                      found += 1
                      qx += dy
                      qy -= dx
                  if px != py:
                      found *= 2
                  result += found
          return result
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler091.py"
    performance: "~10ms"
  - language: "rust"
    code: |
      pub fn right_triangles_integer_coordinates() -> usize {
          const SIZE: usize = 50;
          let mut result = 3 * SIZE * SIZE;
          for px in 1..=SIZE {
              for py in 1..=px {
                  let factor = gcd(px, py);
                  let dx = px / factor;
                  let dy = py / factor;
                  let mut found = 0;
                  // Q below P
                  let mut qx = px as i32 - dy as i32;
                  let mut qy = py as i32 + dx as i32;
                  while qx >= 0 && qy <= SIZE as i32 {
                      found += 1;
                      qx -= dy as i32;
                      qy += dx as i32;
                  }
                  // Q above P
                  let mut qx = px as i32 + dy as i32;
                  let mut qy = py as i32 - dx as i32;
                  while qy >= 0 && qx <= SIZE as i32 {
                      found += 1;
                      qx += dy as i32;
                      qy -= dx as i32;
                  }
                  if px != py {
                      found *= 2;
                  }
                  result += found;
              }
          }
          result
      }

      fn gcd(a: usize, b: usize) -> usize {
          if b == 0 {
              a
          } else {
              gcd(b, a % b)
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler091.rs"
    performance: "~10ms"
tags: ["geometry", "lattice points", "gcd"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
This problem counts the number of right-angled triangles formed by points with integer coordinates on a grid from (0,0) to (50,50), where one vertex is at the origin and the right angle can be at any of the three vertices.

### Algorithm Analysis
The solution iterates over possible positions for the right angle at point P, using GCD to find perpendicular directions. It counts valid Q positions in both directions from P, accounting for symmetry when P is not on the diagonal.

### Performance
All implementations run in under 100ms, with the algorithm being O(N²) where N=50, making it highly efficient for this scale.

### Key Insights
- Cases where the right angle is at the origin or on the axes are counted separately.
- GCD is used to reduce vectors to their simplest form for stepping along lattice lines.
- Symmetry reduces computation by considering only px >= py and doubling counts.

### Educational Value
Illustrates the application of number theory (GCD) in geometric problems on integer lattices, demonstrating how combinatorial methods can efficiently solve counting problems.