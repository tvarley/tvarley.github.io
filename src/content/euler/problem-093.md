---
problemNumber: 93
title: Arithmetic expressions
description: Find the set of four distinct digits, a < b < c < d, for which the longest set of consecutive positive integers, 1 to n, can be found.
difficulty: medium
date: 2024-04-12
technologies:
  - Recursive algorithms
  - Combinatorics
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <vector>
      #include <set>
      #include <algorithm>

      std::set<double> evaluate_rec(const std::vector<double>& nums) {
          int n = nums.size();
          std::set<double> results;
          if (n == 1) {
              results.insert(nums[0]);
              return results;
          }
          // try all ways to split
          for (int i = 1; i < n; ++i) {
              auto left = std::vector<double>(nums.begin(), nums.begin() + i);
              auto right = std::vector<double>(nums.begin() + i, nums.end());
              auto left_vals = evaluate_rec(left);
              auto right_vals = evaluate_rec(right);
              for (double lv : left_vals) {
                  for (double rv : right_vals) {
                      results.insert(lv + rv);
                      results.insert(lv - rv);
                      results.insert(lv * rv);
                      if (rv != 0) results.insert(lv / rv);
                  }
              }
          }
          return results;
      }

      std::set<int> evaluate(const std::vector<double>& nums) {
          auto doubles = evaluate_rec(nums);
          std::set<int> ints;
          for (double d : doubles) {
              if (d > 0 && d == (int)d) ints.insert((int)d);
          }
          return ints;
      }

      long long arithmetic_expressions() {
          std::vector<int> digits = {1,2,3,4,5,6,7,8,9};
          int max_n = 0;
          std::string best_set;
          for (int a = 0; a < 9; ++a) {
              for (int b = a + 1; b < 9; ++b) {
                  for (int c = b + 1; c < 9; ++c) {
                      for (int d = c + 1; d < 9; ++d) {
                          std::vector<int> set = {digits[a], digits[b], digits[c], digits[d]};
                          std::set<int> values;
                          // generate all permutations of set
                          do {
                              std::vector<double> nums(set.begin(), set.end());
                              auto res = evaluate(nums);
                              values.insert(res.begin(), res.end());
                          } while (std::next_permutation(set.begin(), set.end()));
                          // find longest consecutive from 1
                          int n = 0;
                          while (values.count(n + 1)) n++;
                          if (n > max_n) {
                              max_n = n;
                              best_set = std::to_string(set[0]) + std::to_string(set[1]) + std::to_string(set[2]) + std::to_string(set[3]);
                          }
                      }
                  }
              }
          }
          return std::stoi(best_set);
      }
    githubLink: https://github.com/tvarley/euler/blob/master/cpp/src/euler093.cpp
    performance: ~500ms
  - language: go
    code: |
      package main

      import (
          "strconv"
      )

      func evaluateRec(nums []float64) map[float64]bool {
          n := len(nums)
          results := make(map[float64]bool)
          if n == 1 {
              results[nums[0]] = true
              return results
          }
          for i := 1; i < n; i++ {
              left := nums[:i]
              right := nums[i:]
              leftVals := evaluateRec(left)
              rightVals := evaluateRec(right)
              for lv := range leftVals {
                  for rv := range rightVals {
                      results[lv+rv] = true
                      results[lv-rv] = true
                      results[lv*rv] = true
                      if rv != 0 {
                          results[lv/rv] = true
                      }
                  }
              }
          }
          return results
      }

      func evaluate(nums []float64) map[int]bool {
          doubles := evaluateRec(nums)
          ints := make(map[int]bool)
          for d := range doubles {
              if d > 0 && d == float64(int(d)) {
                  ints[int(d)] = true
              }
          }
          return ints
      }

      func permutations(arr []int) [][]int {
          var result [][]int
          n := len(arr)
          if n == 1 {
              return [][]int{arr}
          }
          for i := 0; i < n; i++ {
              rest := make([]int, 0, n-1)
              rest = append(rest, arr[:i]...)
              rest = append(rest, arr[i+1:]...)
              perms := permutations(rest)
              for _, p := range perms {
                  result = append(result, append([]int{arr[i]}, p...))
              }
          }
          return result
      }

      func arithmeticExpressions() int {
          digits := []int{1,2,3,4,5,6,7,8,9}
          maxN := 0
          bestSet := ""
          for a := 0; a < 9; a++ {
              for b := a + 1; b < 9; b++ {
                  for c := b + 1; c < 9; c++ {
                      for d := c + 1; d < 9; d++ {
                          set := []int{digits[a], digits[b], digits[c], digits[d]}
                          values := make(map[int]bool)
                          perms := permutations(set)
                          for _, perm := range perms {
                              nums := make([]float64, len(perm))
                              for i, v := range perm {
                                  nums[i] = float64(v)
                              }
                              res := evaluate(nums)
                              for v := range res {
                                  values[v] = true
                              }
                          }
                          n := 0
                          for {
                              if !values[n+1] {
                                  break
                              }
                              n++
                          }
                          if n > maxN {
                              maxN = n
                              bestSet = strconv.Itoa(set[0]) + strconv.Itoa(set[1]) + strconv.Itoa(set[2]) + strconv.Itoa(set[3])
                          }
                      }
                  }
              }
          }
          result, _ := strconv.Atoi(bestSet)
          return result
      }
    githubLink: https://github.com/tvarley/euler/blob/master/go/src/euler093.go
    performance: ~500ms
  - language: java
    code: |
      import java.util.*;

      public class Euler093 {
          static Set<Double> evaluateRec(List<Double> nums) {
              int n = nums.size();
              Set<Double> results = new HashSet<>();
              if (n == 1) {
                  results.add(nums.get(0));
                  return results;
              }
              for (int i = 1; i < n; i++) {
                  List<Double> left = nums.subList(0, i);
                  List<Double> right = nums.subList(i, n);
                  Set<Double> leftVals = evaluateRec(left);
                  Set<Double> rightVals = evaluateRec(right);
                  for (double lv : leftVals) {
                      for (double rv : rightVals) {
                          results.add(lv + rv);
                          results.add(lv - rv);
                          results.add(lv * rv);
                          if (rv != 0) results.add(lv / rv);
                      }
                  }
              }
              return results;
          }

          static Set<Integer> evaluate(List<Double> nums) {
              Set<Double> doubles = evaluateRec(nums);
              Set<Integer> ints = new HashSet<>();
              for (double d : doubles) {
                  if (d > 0 && d == (int) d) ints.add((int) d);
              }
              return ints;
          }

          static List<List<Integer>> permutations(List<Integer> arr) {
              List<List<Integer>> result = new ArrayList<>();
              int n = arr.size();
              if (n == 1) {
                  result.add(new ArrayList<>(arr));
                  return result;
              }
              for (int i = 0; i < n; i++) {
                  List<Integer> rest = new ArrayList<>(arr);
                  rest.remove(i);
                  List<List<Integer>> perms = permutations(rest);
                  for (List<Integer> p : perms) {
                      List<Integer> newPerm = new ArrayList<>();
                      newPerm.add(arr.get(i));
                      newPerm.addAll(p);
                      result.add(newPerm);
                  }
              }
              return result;
          }

          static int arithmeticExpressions() {
              List<Integer> digits = Arrays.asList(1,2,3,4,5,6,7,8,9);
              int maxN = 0;
              String bestSet = "";
              for (int a = 0; a < 9; a++) {
                  for (int b = a + 1; b < 9; b++) {
                      for (int c = b + 1; c < 9; c++) {
                          for (int d = c + 1; d < 9; d++) {
                              List<Integer> set = Arrays.asList(digits.get(a), digits.get(b), digits.get(c), digits.get(d));
                              Set<Integer> values = new HashSet<>();
                              List<List<Integer>> perms = permutations(set);
                              for (List<Integer> perm : perms) {
                                  List<Double> nums = new ArrayList<>();
                                  for (int v : perm) nums.add((double) v);
                                  Set<Integer> res = evaluate(nums);
                                  values.addAll(res);
                              }
                              int n = 0;
                              while (values.contains(n + 1)) n++;
                              if (n > maxN) {
                                  maxN = n;
                                  bestSet = set.get(0) + "" + set.get(1) + "" + set.get(2) + "" + set.get(3);
                              }
                          }
                      }
                  }
              }
              return Integer.parseInt(bestSet);
          }
      }
    githubLink: https://github.com/tvarley/euler/blob/master/java/src/euler093.java
    performance: ~500ms
  - language: javascript
    code: |
      function evaluate_rec(nums) {
        const n = nums.length;
        const results = new Set();
        if (n === 1) {
          results.add(nums[0]);
          return results;
        }
        for (let i = 1; i < n; i++) {
          const left = nums.slice(0, i);
          const right = nums.slice(i);
          const left_vals = evaluate_rec(left);
          const right_vals = evaluate_rec(right);
          for (const lv of left_vals) {
            for (const rv of right_vals) {
              results.add(lv + rv);
              results.add(lv - rv);
              results.add(lv * rv);
              if (rv !== 0) results.add(lv / rv);
            }
          }
        }
        return results;
      }

      function evaluate(nums) {
        const doubles = evaluate_rec(nums);
        const ints = new Set();
        for (const d of doubles) {
          if (d > 0 && d === Math.floor(d)) ints.add(d);
        }
        return ints;
      }

      function permute(arr) {
        const result = [];
        if (arr.length === 1) return [arr];
        for (let i = 0; i < arr.length; i++) {
          const rest = arr.slice(0, i).concat(arr.slice(i + 1));
          const perms = permute(rest);
          for (const p of perms) {
            result.push([arr[i], ...p]);
          }
        }
        return result;
      }

      function arithmetic_expressions() {
        const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let max_n = 0;
        let best_set = '';
        for (let a = 0; a < 9; a++) {
          for (let b = a + 1; b < 9; b++) {
            for (let c = b + 1; c < 9; c++) {
              for (let d = c + 1; d < 9; d++) {
                const set = [digits[a], digits[b], digits[c], digits[d]];
                const values = new Set();
                const perms = permute(set);
                for (const p of perms) {
                  const res = evaluate(p.map(x => x * 1.0));
                  for (const v of res) values.add(v);
                }
                let n = 0;
                while (values.has(n + 1)) n++;
                if (n > max_n) {
                  max_n = n;
                  best_set = set.join('');
                }
              }
            }
          }
        }
        return parseInt(best_set);
      }
    githubLink: https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution093.js
    performance: ~500ms
  - language: python
    code: |
      def evaluate_rec(nums):
          if len(nums) == 1:
              return {nums[0]}
          results = set()
          for i in range(1, len(nums)):
              left = nums[:i]
              right = nums[i:]
              left_vals = evaluate_rec(left)
              right_vals = evaluate_rec(right)
              for lv in left_vals:
                  for rv in right_vals:
                      results.add(lv + rv)
                      results.add(lv - rv)
                      results.add(lv * rv)
                      if rv != 0:
                          results.add(lv / rv)
          return results

      def evaluate(nums):
          doubles = evaluate_rec(nums)
          return {int(d) for d in doubles if d > 0 and d == int(d)}

      def solve():
          digits = list(range(1, 10))
          max_n = 0
          best_set = ""
          from itertools import combinations, permutations
          for combo in combinations(digits, 4):
              values = set()
              for perm in permutations(combo):
                  res = evaluate(perm)
                  values.update(res)
              # find longest consecutive from 1
              n = 0
              while n + 1 in values:
                  n += 1
              if n > max_n:
                  max_n = n
                  best_set = ''.join(map(str, sorted(combo)))
          return int(best_set)
    githubLink: https://github.com/tvarley/euler/blob/master/python/src/euler093.py
    performance: ~1000ms
  - language: rust
    code: |
      use std::collections::HashSet;

      fn evaluate_rec(nums: &Vec<f64>) -> HashSet<f64> {
          let n = nums.len();
          let mut results = HashSet::new();
          if n == 1 {
              results.insert(nums[0]);
              return results;
          }
          for i in 1..n {
              let left: Vec<f64> = nums[0..i].to_vec();
              let right: Vec<f64> = nums[i..].to_vec();
              let left_vals = evaluate_rec(&left);
              let right_vals = evaluate_rec(&right);
              for lv in &left_vals {
                  for rv in &right_vals {
                      results.insert(lv + rv);
                      results.insert(lv - rv);
                      results.insert(lv * rv);
                      if *rv != 0.0 { results.insert(lv / rv); }
                  }
              }
          }
          results
      }

      fn evaluate(nums: &Vec<f64>) -> HashSet<i32> {
          let doubles = evaluate_rec(nums);
          let mut ints = HashSet::new();
          for d in doubles {
              if d > 0.0 && d == d as i32 as f64 {
                  ints.insert(d as i32);
              }
          }
          ints
      }

      fn permutations(arr: Vec<i32>) -> Vec<Vec<i32>> {
          let mut result = Vec::new();
          let n = arr.len();
          if n == 1 {
              result.push(arr);
              return result;
          }
          for i in 0..n {
              let mut rest = Vec::with_capacity(n - 1);
              rest.extend_from_slice(&arr[0..i]);
              rest.extend_from_slice(&arr[i + 1..]);
              let perms = permutations(rest);
              for mut p in perms {
                  p.insert(0, arr[i]);
                  result.push(p);
              }
          }
          result
      }

      pub fn arithmetic_expressions() -> String {
          let digits: Vec<i32> = (1..=9).collect();
          let mut max_n = 0;
          let mut best_set = String::new();
          for a in 0..9 {
              for b in (a + 1)..9 {
                  for c in (b + 1)..9 {
                      for d in (c + 1)..9 {
                          let set = vec![digits[a], digits[b], digits[c], digits[d]];
                          let mut values = HashSet::new();
                          let perms = permutations(set);
                          for perm in perms {
                              let nums: Vec<f64> = perm.iter().map(|&x| x as f64).collect();
                              let res = evaluate(&nums);
                              for v in res {
                                  values.insert(v);
                              }
                          }
                          let mut n = 0;
                          while values.contains(&(n + 1)) {
                              n += 1;
                          }
                          if n > max_n {
                              max_n = n;
                              best_set = format!("{}{}{}{}", digits[a], digits[b], digits[c], digits[d]);
                          }
                      }
                  }
              }
          }
          best_set
      }
    githubLink: https://github.com/tvarley/euler/blob/master/rust/src/euler093.rs
    performance: ~1000ms
tags:
  - combinatorics
  - recursion
  - arithmetic
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

The problem involves finding the optimal set of four distinct digits that can generate the longest sequence of consecutive positive integers starting from 1 using basic arithmetic operations (+, -, *, /) and parentheses.

### Algorithm Analysis

The solution uses recursive expression evaluation to generate all possible values from digit permutations, then finds the set maximizing consecutive integers from 1.

### Performance

Varies by language: ~500ms in C++/Go/Java/JavaScript, ~1000ms in Python/Rust on modern hardware.

### Key Insights

- Recursive evaluation of all possible expression trees
- Permutation generation for different digit orders
- Finding maximal consecutive sequences starting from 1

### Educational Value

Demonstrates combinatorial problem solving, recursive algorithms, and optimization techniques in multiple programming languages.