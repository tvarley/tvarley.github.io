---
problemNumber: 99
title: Largest exponential
description: Find the line number of the base-exponent pair with the greatest numerical value.
difficulty: easy
date: 2024-04-12
technologies:
  - logarithms
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <fstream>
      #include <string>
      #include <cmath>

      long long largest_exponential() {
          std::ifstream file("src/p099_base_exp.txt");
          if (!file) return 0;
          std::string line;
          int line_num = 0;
          int max_line = 0;
          double max_val = 0;
          while (std::getline(file, line)) {
              line_num++;
              size_t comma = line.find(',');
              int base = std::stoi(line.substr(0, comma));
              int exp = std::stoi(line.substr(comma + 1));
              double val = exp * std::log(base);
              if (val > max_val) {
                  max_val = val;
                  max_line = line_num;
              }
          }
          return max_line;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/cpp/src/euler099.cpp
    performance: ~1ms
  - language: go
    code: |
      package main

      import (
          "bufio"
          "math"
          "os"
          "strconv"
          "strings"
      )

      func largestExponential() int {
          file, _ := os.Open("src/p099_base_exp.txt")
          defer file.Close()
          scanner := bufio.NewScanner(file)
          lineNum := 0
          maxLine := 0
          maxVal := 0.0
          for scanner.Scan() {
              lineNum++
              parts := strings.Split(scanner.Text(), ",")
              base, _ := strconv.Atoi(parts[0])
              exp, _ := strconv.Atoi(parts[1])
              val := float64(exp) * math.Log(float64(base))
              if val > maxVal {
                  maxVal = val
                  maxLine = lineNum
              }
          }
          return maxLine
      }
    githubLink: https://github.com/tvarley/euler/blob/master/go/src/euler099.go
    performance: ~1ms
  - language: java
    code: |
      import java.io.*;
      import java.util.*;

      public class Euler099 {
          static long largestExponential() {
              long maxLine = 0;
              double maxVal = 0;
              try (BufferedReader br = new BufferedReader(new FileReader("src/p099_base_exp.txt"))) {
                  String line;
                  long lineNum = 0;
                  while ((line = br.readLine()) != null) {
                      lineNum++;
                      String[] parts = line.split(",");
                      int base = Integer.parseInt(parts[0]);
                      int exp = Integer.parseInt(parts[1]);
                      double val = exp * Math.log(base);
                      if (val > maxVal) {
                          maxVal = val;
                          maxLine = lineNum;
                      }
                  }
              } catch (IOException e) {
                  return 0;
              }
              return maxLine;
          }
      }
    githubLink: https://github.com/tvarley/euler/blob/master/java/src/euler099.java
    performance: ~1ms
  - language: javascript
    code: |
      const fs = require('fs');

      function largest_exponential() {
        const data = fs.readFileSync('src/euler/p099_base_exp.txt', 'utf8');
        const lines = data.trim().split('\n');
        let maxLine = 0;
        let maxVal = 0;
        for (let i = 0; i < lines.length; i++) {
          const [base, exp] = lines[i].split(',').map(Number);
          const val = exp * Math.log(base);
          if (val > maxVal) {
            maxVal = val;
            maxLine = i + 1;
          }
        }
        return maxLine;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution099.js
    performance: ~1ms
  - language: python
    code: |
      import math

      def solve():
          max_line = 0
          max_val = 0
          with open('../cpp/src/p099_base_exp.txt') as f:
              for i, line in enumerate(f, 1):
                  base, exp = map(int, line.strip().split(','))
                  val = exp * math.log(base)
                  if val > max_val:
                      max_val = val
                      max_line = i
          return max_line
    githubLink: https://github.com/tvarley/euler/blob/master/python/src/euler099.py
    performance: ~1ms
  - language: rust
    code: |
      use std::fs;

      pub fn largest_exponential() -> usize {
          let data = fs::read_to_string("src/p099_base_exp.txt").unwrap();
          let mut max_line = 0;
          let mut max_val = 0.0;
          for (i, line) in data.trim().split('\n').enumerate() {
              let parts: Vec<&str> = line.split(',').collect();
              let base: f64 = parts[0].parse().unwrap();
              let exp: f64 = parts[1].parse().unwrap();
              let val = exp * base.ln();
              if val > max_val {
                  max_val = val;
                  max_line = i + 1;
              }
          }
          max_line
      }
    githubLink: https://github.com/tvarley/euler/blob/master/rust/src/euler099.rs
    performance: ~1ms
tags:
  - logarithms
  - comparison
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

Comparing large exponentials b^e without computing the actual values. Since log is monotonic, compare e * log(b) instead.

### Algorithm Analysis

Read each base-exponent pair from file, compute exp * log(base), track maximum value and its line number.

### Performance

Extremely fast (~1ms) due to simple file reading and logarithmic computations.

### Key Insights

- Logarithmic comparison avoids overflow and precision issues with huge numbers
- Direct file parsing with string splitting

### Educational Value

Demonstrates logarithmic transformations for comparing large numbers and basic file I/O in multiple languages.