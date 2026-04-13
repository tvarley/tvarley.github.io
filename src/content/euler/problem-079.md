---
problemNumber: 79
title: "Passcode Derivation"
description: |
  A common security method used for online banking is to ask the user for three random characters from a passcode. For example, if the passcode was 531278, they may ask for the 2nd, 3rd, and 5th characters; the expected reply would be: 317.

  The text file, keylog.txt, contains fifty successful login attempts.

  Given that the three characters are always asked for in order, analyse the file so as to determine the shortest possible secret passcode of unknown length.
difficulty: "medium"
date: 2026-04-12
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <vector>
      #include <queue>
      #include <set>
      #include <fstream>

      std::string passcode_derivation() {
          std::ifstream file("keylog.txt");
          std::vector<std::string> logs;
          std::string line;
          while (std::getline(file, line)) {
              if (line.size() == 3) logs.push_back(line);
          }
          std::vector<std::set<int>> graph(10);
          std::vector<int> indegree(10, 0);
          std::set<int> digits;
          for (const auto& log : logs) {
              int a = log[0] - '0', b = log[1] - '0', c = log[2] - '0';
              digits.insert(a);
              digits.insert(b);
              digits.insert(c);
              if (graph[a].find(b) == graph[a].end()) {
                  graph[a].insert(b);
                  ++indegree[b];
              }
              if (graph[b].find(c) == graph[b].end()) {
                  graph[b].insert(c);
                  ++indegree[c];
              }
          }
          std::queue<int> q;
          for (int d : digits) {
              if (indegree[d] == 0) q.push(d);
          }
          std::string passcode;
          while (!q.empty()) {
              int d = q.front(); q.pop();
              passcode += '0' + d;
              for (int next : graph[d]) {
                  --indegree[next];
                  if (indegree[next] == 0) q.push(next);
              }
          }
          return passcode;
      }

      #if ! defined UNITTEST_MODE
      int main(int argc, char const *argv[]) {
          std::cout << passcode_derivation() << std::endl;
      }
      #endif
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler079.cpp"
    performance: "O(n) time complexity"
  - language: "go"
    code: |
      package main

      import (
          "bufio"
          "fmt"
          "os"
          "strconv"
      )

      func passcodeDerivation() string {
          file, err := os.Open("keylog.txt")
          if err != nil {
              panic(err)
          }
          defer file.Close()
          scanner := bufio.NewScanner(file)
          triples := [][]int{}
          for scanner.Scan() {
              line := scanner.Text()
              if len(line) == 3 {
                  t := make([]int, 3)
                  for i, c := range line {
                      t[i] = int(c - '0')
                  }
                  triples = append(triples, t)
              }
          }
          digits := make(map[int]bool)
          for _, t := range triples {
              for _, d := range t {
                  digits[d] = true
              }
          }
          graph := make(map[int][]int)
          inDegree := make(map[int]int)
          for d := range digits {
              inDegree[d] = 0
          }
          for _, t := range triples {
              a, b, c := t[0], t[1], t[2]
              if a != b {
                  if !contains(graph[a], b) {
                      graph[a] = append(graph[a], b)
                      inDegree[b]++
                  }
              }
              if b != c {
                  if !contains(graph[b], c) {
                      graph[b] = append(graph[b], c)
                      inDegree[c]++
                  }
              }
              if a != c {
                  if !contains(graph[a], c) {
                      graph[a] = append(graph[a], c)
                      inDegree[c]++
                  }
              }
          }
          queue := []int{}
          for d, deg := range inDegree {
              if deg == 0 {
                  queue = append(queue, d)
              }
          }
          result := []int{}
          for len(queue) > 0 {
              curr := queue[0]
              queue = queue[1:]
              result = append(result, curr)
              for _, next := range graph[curr] {
                  inDegree[next]--
                  if inDegree[next] == 0 {
                      queue = append(queue, next)
                  }
              }
          }
          if len(result) != len(digits) {
              panic("cycle")
          }
          s := ""
          for _, d := range result {
              s += strconv.Itoa(d)
          }
          return s
      }

      func contains(slice []int, val int) bool {
          for _, v := range slice {
              if v == val {
                  return true
              }
          }
          return false
      }

      func main() {
          fmt.Println(passcodeDerivation())
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/go/euler079.go"
    performance: "O(n) time complexity, execution ~0ms"
  - language: "java"
    code: |
      package org.tvarley.euler.solutions;

      import org.tvarley.euler.Solution;
      import java.io.*;
      import java.util.*;

      public class Solution079 implements Solution {
        public String solve() {
          List<String> logs = new ArrayList<>();
          try (InputStream is = getClass().getResourceAsStream("/keylog.txt");
               BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
            String line;
            while ((line = br.readLine()) != null) {
              if (line.length() == 3) logs.add(line);
            }
          } catch (IOException e) {
            return "";
          }
          List<Set<Integer>> graph = new ArrayList<>();
          for (int i = 0; i < 10; ++i) graph.add(new HashSet<>());
          int[] indegree = new int[10];
          Set<Integer> digits = new HashSet<>();
          for (String log : logs) {
            int a = log.charAt(0) - '0', b = log.charAt(1) - '0', c = log.charAt(2) - '0';
            digits.add(a);
            digits.add(b);
            digits.add(c);
            if (!graph.get(a).contains(b)) {
              graph.get(a).add(b);
              ++indegree[b];
            }
            if (!graph.get(b).contains(c)) {
              graph.get(b).add(c);
              ++indegree[c];
            }
          }
          Queue<Integer> q = new LinkedList<>();
          for (int d : digits) {
            if (indegree[d] == 0) q.add(d);
          }
          StringBuilder passcode = new StringBuilder();
          while (!q.isEmpty()) {
            int d = q.poll();
            passcode.append(d);
            for (int next : graph.get(d)) {
              --indegree[next];
              if (indegree[next] == 0) q.add(next);
            }
          }
          return passcode.toString();
        }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/java/src/main/java/org/tvarley/euler/solutions/Solution079.java"
    performance: "O(n) time complexity"
  - language: "javascript"
    code: |
      const fs = require('fs');

      function passcodeDerivation() {
        const data = fs.readFileSync('src/euler/keylog.txt', 'utf8').split('\n').filter(line => line.length === 3);
        const graph = Array.from({length: 10}, () => new Set());
        const indegree = new Array(10).fill(0);
        const digits = new Set();
        for (const log of data) {
          const a = parseInt(log[0]), b = parseInt(log[1]), c = parseInt(log[2]);
          digits.add(a);
          digits.add(b);
          digits.add(c);
          if (!graph[a].has(b)) {
            graph[a].add(b);
            indegree[b]++;
          }
          if (!graph[b].has(c)) {
            graph[b].add(c);
            indegree[c]++;
          }
        }
        const queue = [];
        for (const d of digits) {
          if (indegree[d] === 0) queue.push(d);
        }
        let passcode = '';
        while (queue.length > 0) {
          const d = queue.shift();
          passcode += d;
          for (const next of graph[d]) {
            indegree[next]--;
            if (indegree[next] === 0) queue.push(next);
          }
        }
        return passcode;
      }

      module.exports = {
        answer: () => passcodeDerivation()
      };
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution079.js"
    performance: "O(n) time complexity, execution ~10ms"
  - language: "python"
    code: |
      def solve():
          from collections import defaultdict
          with open('data/0079_keylog.txt') as f:
              attempts = [line.strip() for line in f]
          graph = defaultdict(list)
          nodes = set()
          for att in attempts:
              a, b, c = att
              nodes.add(a)
              nodes.add(b)
              nodes.add(c)
              graph[a].append(b)
              graph[b].append(c)
          # Now, topological sort using DFS
          visited = set()
          temp = set()
          result = []
          def dfs(node):
              if node in temp:
                  return  # cycle
              if node in visited:
                  return
              temp.add(node)
              for neigh in graph[node]:
                  dfs(neigh)
              temp.remove(node)
              visited.add(node)
              result.append(node)
          for node in sorted(nodes):
              if node not in visited:
                  dfs(node)
          result.reverse()
          return int(''.join(result))

      if __name__ == "__main__":
          print(solve())
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler079.py"
    performance: "O(n) time complexity, execution ~1ms"
  - language: "rust"
    code: |
      pub fn passcode_derivation() -> u64 {
          let triples = vec![
              "319", "680", "180", "690", "129", "620", "762", "689", "762", "318",
              "368", "710", "720", "710", "629", "168", "160", "689", "716", "731",
              "736", "729", "316", "729", "729", "710", "769", "290", "719", "680",
              "318", "389", "162", "289", "162", "718", "729", "319", "790", "680",
              "890", "362", "319", "760", "316", "729", "380", "319", "728", "716"
          ];
          let mut graph: std::collections::HashMap<char, Vec<char>> = std::collections::HashMap::new();
          let mut indegree: std::collections::HashMap<char, i32> = std::collections::HashMap::new();
          for triple in &triples {
              let chars: Vec<char> = triple.chars().collect();
              let a = chars[0];
              let b = chars[1];
              let c = chars[2];
              graph.entry(a).or_insert(vec![]).push(b);
              graph.entry(b).or_insert(vec![]).push(c);
              *indegree.entry(a).or_insert(0) += 0;
              *indegree.entry(b).or_insert(0) += 1;
              *indegree.entry(c).or_insert(0) += 1;
          }
          let mut all_digits: std::collections::HashSet<char> = std::collections::HashSet::new();
          for triple in &triples {
              for c in triple.chars() {
                  all_digits.insert(c);
              }
          }
          let mut queue: std::collections::VecDeque<char> = std::collections::VecDeque::new();
          for &d in &all_digits {
              if *indegree.get(&d).unwrap_or(&0) == 0 {
                  queue.push_back(d);
              }
          }
          let mut result = String::new();
          while let Some(d) = queue.pop_front() {
              result.push(d);
              if let Some(neighbors) = graph.get(&d) {
                  for &n in neighbors {
                      *indegree.get_mut(&n).unwrap() -= 1;
                      if *indegree.get(&n).unwrap() == 0 {
                          queue.push_back(n);
                      }
                  }
              }
          }
          result.parse().unwrap()
      }

      #[cfg(test)]
      mod tests {
          use super::*;

          #[test]
          fn euler_079() {
              assert_eq!(passcode_derivation(), 73162890);
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler079.rs"
    performance: "O(n) time complexity, execution ~0ms"
tags: ["euler", "graphs", "topological sort"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

The problem involves reconstructing a secret passcode from partial sequences. Each login attempt provides three consecutive digits in order.

This is a graph problem where digits are nodes, and the order constraints are edges. The shortest passcode is found using topological sorting.

### Algorithm Analysis

Build a directed graph where an edge A->B means A appears before B in some triple.

Use Kahn's algorithm (BFS topological sort) to find the order with no cycles.

The resulting sequence is the passcode.

### Performance Analysis

- **Time Complexity**: O(n + v) where n is triples, v is digits (10)
- **Space Complexity**: O(v + e) for graph
- **Execution Time**: Very fast, milliseconds
- **Scalability**: Linear in input size

### Key Insights

- Topological sort reconstructs the sequence from partial orders
- The graph must be a DAG (no cycles)
- Answer is 73162890

### Educational Value

This problem teaches:
- Graph construction from constraints
- Topological sorting algorithms
- Solving problems with partial information