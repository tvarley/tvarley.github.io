---
problemNumber: 98
title: Anagramic squares
description: Find the largest square number formed by substituting letters of an anagram pair with digits.
difficulty: hard
date: 2024-04-12
technologies:
  - backtracking
  - combinatorics
implementations:
  - language: cpp
    code: |
      #include <iostream>
      #include <fstream>
      #include <vector>
      #include <string>
      #include <map>
      #include <set>
      #include <algorithm>
      #include <cmath>

      bool is_square(long long n) {
          long long root = (long long)std::sqrt(n);
          return root * root == n;
      }

      void try_mapping(const std::vector<char>& letter_list, int pos, std::vector<bool>& used, std::map<char, int>& mapping, const std::string& w1, const std::string& w2, long long& max_square) {
          // Recursive backtracking to assign distinct digits 0-9 to letters, checking for valid square numbers
          if (pos == letter_list.size()) {
              if (mapping[w1[0]] == 0 || mapping[w2[0]] == 0) return;
              long long num1 = 0, num2 = 0;
              for (char c : w1) num1 = num1 * 10 + mapping[c];
              for (char c : w2) num2 = num2 * 10 + mapping[c];
              if (is_square(num1) && is_square(num2)) {
                  max_square = std::max({max_square, num1, num2});
              }
              return;
          }
          for (int d = 0; d < 10; ++d) {
              if (used[d]) continue;
              mapping[letter_list[pos]] = d;
              used[d] = true;
              try_mapping(letter_list, pos + 1, used, mapping, w1, w2, max_square);
              used[d] = false;
          }
      }

      long long anagramic_squares() {
          std::ifstream file("src/p098_words.txt");
          if (!file) return 0;
          std::string content;
          std::getline(file, content);
          // parse words - split by comma and remove quotes
          std::vector<std::string> words;
          std::string word;
          bool in_quote = false;
          for (char c : content) {
              if (c == '"') {
                  in_quote = !in_quote;
                  if (!in_quote && !word.empty()) {
                      words.push_back(word);
                      word.clear();
                  }
              } else if (in_quote) {
                  word += c;
              }
          }
          // group by sorted letters
          std::map<std::string, std::vector<std::string>> anagrams;
          for (const std::string& word : words) {
              std::string sorted = word;
              std::sort(sorted.begin(), sorted.end());
              anagrams[sorted].push_back(word);
          }
          long long max_square = 0;

          for (const auto& p : anagrams) {
              if (p.second.size() < 2) continue;
              for (size_t i = 0; i < p.second.size(); ++i) {
                  for (size_t j = i + 1; j < p.second.size(); ++j) {
                      std::string w1 = p.second[i], w2 = p.second[j];
                      // get unique letters
                      std::set<char> letters;
                      for (char c : w1) letters.insert(c);
                      for (char c : w2) letters.insert(c);
                      if (letters.size() > 10) continue; // impossible
                      // generate digit assignments using backtracking for efficiency
                      std::vector<char> letter_list(letters.begin(), letters.end());
                      std::vector<bool> used(10, false);
                      std::map<char, int> mapping;
                      try_mapping(letter_list, 0, used, mapping, w1, w2, max_square);
                  }
              }
          }
          return max_square;
      }
    githubLink: https://github.com/tvarley/euler/blob/master/cpp/src/euler098.cpp
    performance: ~100ms
  - language: go
    code: |
      package main

      import (
          "bufio"
          "math"
          "os"
          "sort"
          "strconv"
          "strings"
      )

      func isSquare(n int64) bool {
          root := int64(math.Sqrt(float64(n)))
          return root*root == n
      }

      func tryMapping(letterList []rune, pos int, used []bool, mapping map[rune]int, w1, w2 string, maxSquare *int64) {
          if pos == len(letterList) {
              if mapping[rune(w1[0])] == 0 || mapping[rune(w2[0])] == 0 {
                  return
              }
              num1, num2 := int64(0), int64(0)
              for _, c := range w1 {
                  num1 = num1*10 + int64(mapping[c])
              }
              for _, c := range w2 {
                  num2 = num2*10 + int64(mapping[c])
              }
              if isSquare(num1) && isSquare(num2) {
                  if num1 > *maxSquare {
                      *maxSquare = num1
                  }
                  if num2 > *maxSquare {
                      *maxSquare = num2
                  }
              }
              return
          }
          for d := 0; d < 10; d++ {
              if used[d] {
                  continue
              }
              mapping[letterList[pos]] = d
              used[d] = true
              tryMapping(letterList, pos+1, used, mapping, w1, w2, maxSquare)
              used[d] = false
          }
      }

      func anagramicSquares() int64 {
          file, _ := os.Open("src/p098_words.txt")
          defer file.Close()
          scanner := bufio.NewScanner(file)
          scanner.Scan()
          content := scanner.Text()
          words := strings.Split(content, ",")
          for i, word := range words {
              words[i] = strings.Trim(word, "\"")
          }
          anagrams := make(map[string][]string)
          for _, word := range words {
              sorted := []rune(word)
              sort.Slice(sorted, func(i, j int) bool { return sorted[i] < sorted[j] })
              key := string(sorted)
              anagrams[key] = append(anagrams[key], word)
          }
          maxSquare := int64(0)
          for _, group := range anagrams {
              if len(group) < 2 {
                  continue
              }
              for i := 0; i < len(group); i++ {
                  for j := i + 1; j < len(group); j++ {
                      w1, w2 := group[i], group[j]
                      letters := make(map[rune]bool)
                      for _, c := range w1 {
                          letters[c] = true
                      }
                      for _, c := range w2 {
                          letters[c] = true
                      }
                      if len(letters) > 10 {
                          continue
                      }
                      letterList := make([]rune, 0, len(letters))
                      for c := range letters {
                          letterList = append(letterList, c)
                      }
                      used := make([]bool, 10)
                      mapping := make(map[rune]int)
                      tryMapping(letterList, 0, used, mapping, w1, w2, &maxSquare)
                  }
              }
          }
          return maxSquare
      }
    githubLink: https://github.com/tvarley/euler/blob/master/go/src/euler098.go
    performance: ~100ms
  - language: java
    code: |
      import java.io.*;
      import java.util.*;

      public class Euler098 {
          static boolean isSquare(long n) {
              long root = (long) Math.sqrt(n);
              return root * root == n;
          }

          static void tryMapping(List<Character> letterList, int pos, boolean[] used, Map<Character, Integer> mapping, String w1, String w2, long[] maxSquare) {
              if (pos == letterList.size()) {
                  if (mapping.get(w1.charAt(0)) == 0 || mapping.get(w2.charAt(0)) == 0) return;
                  long num1 = 0, num2 = 0;
                  for (char c : w1.toCharArray()) num1 = num1 * 10 + mapping.get(c);
                  for (char c : w2.toCharArray()) num2 = num2 * 10 + mapping.get(c);
                  if (isSquare(num1) && isSquare(num2)) {
                      maxSquare[0] = Math.max(maxSquare[0], Math.max(num1, num2));
                  }
                  return;
              }
              for (int d = 0; d < 10; d++) {
                  if (used[d]) continue;
                  mapping.put(letterList.get(pos), d);
                  used[d] = true;
                  tryMapping(letterList, pos + 1, used, mapping, w1, w2, maxSquare);
                  used[d] = false;
              }
          }

          static long anagramicSquares() {
              List<String> words = new ArrayList<>();
              try (BufferedReader br = new BufferedReader(new FileReader("src/p098_words.txt"))) {
                  String line = br.readLine();
                  String[] parts = line.split(",");
                  for (String part : parts) {
                      words.add(part.replaceAll("\"", ""));
                  }
              } catch (IOException e) {
                  return 0;
              }
              Map<String, List<String>> anagrams = new HashMap<>();
              for (String word : words) {
                  char[] sorted = word.toCharArray();
                  Arrays.sort(sorted);
                  String key = new String(sorted);
                  anagrams.computeIfAbsent(key, k -> new ArrayList<>()).add(word);
              }
              long[] maxSquare = {0};
              for (List<String> group : anagrams.values()) {
                  if (group.size() < 2) continue;
                  for (int i = 0; i < group.size(); i++) {
                      for (int j = i + 1; j < group.size(); j++) {
                          String w1 = group.get(i), w2 = group.get(j);
                          Set<Character> letters = new HashSet<>();
                          for (char c : w1.toCharArray()) letters.add(c);
                          for (char c : w2.toCharArray()) letters.add(c);
                          if (letters.size() > 10) continue;
                          List<Character> letterList = new ArrayList<>(letters);
                          boolean[] used = new boolean[10];
                          Map<Character, Integer> mapping = new HashMap<>();
                          tryMapping(letterList, 0, used, mapping, w1, w2, maxSquare);
                      }
                  }
              }
              return maxSquare[0];
          }
      }
    githubLink: https://github.com/tvarley/euler/blob/master/java/src/euler098.java
    performance: ~100ms
  - language: javascript
    code: |
      const fs = require('fs');

      function isSquare(n) {
        const root = Math.floor(Math.sqrt(n));
        return root * root === n;
      }

      function tryMapping(letterList, pos, used, mapping, w1, w2, maxSquare) {
        if (pos === letterList.length) {
          if (mapping[w1[0]] === 0 || mapping[w2[0]] === 0) return;
          let num1 = 0, num2 = 0;
          for (const c of w1) num1 = num1 * 10 + mapping[c];
          for (const c of w2) num2 = num2 * 10 + mapping[c];
          if (isSquare(num1) && isSquare(num2)) {
            maxSquare[0] = Math.max(maxSquare[0], num1, num2);
          }
          return;
        }
        for (let d = 0; d < 10; d++) {
          if (used[d]) continue;
          mapping[letterList[pos]] = d;
          used[d] = true;
          tryMapping(letterList, pos + 1, used, mapping, w1, w2, maxSquare);
          used[d] = false;
        }
      }

      function anagramic_squares() {
        const data = fs.readFileSync('src/euler/p098_words.txt', 'utf8');
        const words = data.split(',').map(w => w.replace(/"/g, ''));
        const anagrams = {};
        for (const word of words) {
          const sorted = word.split('').sort().join('');
          if (!anagrams[sorted]) anagrams[sorted] = [];
          anagrams[sorted].push(word);
        }
        let maxSquare = [0];
        for (const group of Object.values(anagrams)) {
          if (group.length < 2) continue;
          for (let i = 0; i < group.length; i++) {
            for (let j = i + 1; j < group.length; j++) {
              const w1 = group[i], w2 = group[j];
              const letters = new Set([...w1, ...w2]);
              if (letters.size > 10) continue;
              const letterList = Array.from(letters);
              const used = new Array(10).fill(false);
              const mapping = {};
              tryMapping(letterList, 0, used, mapping, w1, w2, maxSquare);
            }
          }
        }
        return maxSquare[0];
      }
    githubLink: https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution098.js
    performance: ~100ms
  - language: python
    code: |
      import math

      def is_square(n):
          root = int(math.sqrt(n))
          return root * root == n

      def try_mapping(letter_list, pos, used, mapping, w1, w2, max_square):
          if pos == len(letter_list):
              if mapping.get(w1[0], -1) == 0 or mapping.get(w2[0], -1) == 0:
                  return
              num1 = sum(mapping[c] * 10**(len(w1)-i-1) for i, c in enumerate(w1))
              num2 = sum(mapping[c] * 10**(len(w2)-i-1) for i, c in enumerate(w2))
              if is_square(num1) and is_square(num2):
                  max_square[0] = max(max_square[0], num1, num2)
              return
          for d in range(10):
              if used[d]:
                  continue
              mapping[letter_list[pos]] = d
              used[d] = True
              try_mapping(letter_list, pos + 1, used, mapping, w1, w2, max_square)
              used[d] = False

      def solve():
          with open('../cpp/src/p098_words.txt') as f:
              content = f.read().strip()
          words = [w.strip('"') for w in content.split(',')]
          anagrams = {}
          for word in words:
              sorted_word = ''.join(sorted(word))
              if sorted_word not in anagrams:
                  anagrams[sorted_word] = []
              anagrams[sorted_word].append(word)
          max_square = [0]
          for group in anagrams.values():
              if len(group) < 2:
                  continue
              for i in range(len(group)):
                  for j in range(i + 1, len(group)):
                      w1, w2 = group[i], group[j]
                      letters = set(w1 + w2)
                      if len(letters) > 10:
                          continue
                      letter_list = list(letters)
                      used = [False] * 10
                      mapping = {}
                      try_mapping(letter_list, 0, used, mapping, w1, w2, max_square)
          return max_square[0]
    githubLink: https://github.com/tvarley/euler/blob/master/python/src/euler098.py
    performance: ~1000ms
  - language: rust
    code: |
      use std::collections::{HashMap, HashSet};
      use std::fs;

      fn is_square(n: i64) -> bool {
          let root = (n as f64).sqrt() as i64;
          root * root == n
      }

      fn try_mapping(
          letter_list: &Vec<char>,
          pos: usize,
          used: &mut Vec<bool>,
          mapping: &mut HashMap<char, i32>,
          w1: &str,
          w2: &str,
          max_square: &mut i64,
      ) {
          if pos == letter_list.len() {
              if *mapping.get(&w1.chars().nth(0).unwrap()).unwrap_or(&1) == 0 ||
                 *mapping.get(&w2.chars().nth(0).unwrap()).unwrap_or(&1) == 0 {
                  return;
              }
              let mut num1: i64 = 0;
              let mut num2: i64 = 0;
              for c in w1.chars() {
                  num1 = num1 * 10 + *mapping.get(&c).unwrap() as i64;
              }
              for c in w2.chars() {
                  num2 = num2 * 10 + *mapping.get(&c).unwrap() as i64;
              }
              if is_square(num1) && is_square(num2) {
                  *max_square = (*max_square).max(num1).max(num2);
              }
              return;
          }
          for d in 0..10 {
              if used[d] {
                  continue;
              }
              mapping.insert(letter_list[pos], d as i32);
              used[d] = true;
              try_mapping(letter_list, pos + 1, used, mapping, w1, w2, max_square);
              used[d] = false;
          }
      }

      pub fn anagramic_squares() -> i64 {
          let data = fs::read_to_string("src/p098_words.txt").unwrap();
          let words: Vec<String> = data
              .trim()
              .split(',')
              .map(|s| s.trim_matches('"').to_string())
              .collect();
          let mut anagrams: HashMap<String, Vec<String>> = HashMap::new();
          for word in &words {
              let mut sorted: Vec<char> = word.chars().collect();
              sorted.sort();
              let key = sorted.into_iter().collect::<String>();
              anagrams.entry(key).or_insert(Vec::new()).push(word.clone());
          }
          let mut max_square = 0i64;
          for group in anagrams.values() {
              if group.len() < 2 {
                  continue;
              }
              for i in 0..group.len() {
                  for j in (i + 1)..group.len() {
                      let w1 = &group[i];
                      let w2 = &group[j];
                      let mut letters = HashSet::new();
                      for c in w1.chars() {
                          letters.insert(c);
                      }
                      for c in w2.chars() {
                          letters.insert(c);
                      }
                      if letters.len() > 10 {
                          continue;
                      }
                      let letter_list: Vec<char> = letters.into_iter().collect();
                      let mut used = vec![false; 10];
                      let mut mapping = HashMap::new();
                      try_mapping(&letter_list, 0, &mut used, &mut mapping, w1, w2, &mut max_square);
                  }
              }
          }
          max_square
      }
    githubLink: https://github.com/tvarley/euler/blob/master/rust/src/euler098.rs
    performance: ~1000ms
tags:
  - backtracking
  - anagrams
  - cryptarithm
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background

The problem involves finding anagram pairs from a word list, then finding digit substitutions that make both words into perfect squares. This is a cryptarithm problem where letters represent digits 0-9 with unique assignments.

### Algorithm Analysis

Group words by sorted letters to find anagrams. For each pair, use backtracking to try all possible digit assignments (checking for leading zeros), and validate if both resulting numbers are perfect squares. Track the maximum square found.

### Performance

Varies by language: ~100ms in compiled languages, ~1s in Python due to backtracking complexity with word length and anagram group sizes.

### Key Insights

- Backtracking with pruning for invalid mappings (leading zeros, non-squares)
- File parsing to extract word list from quoted, comma-separated format
- Efficient anagram grouping using sorted strings as keys

### Educational Value

Demonstrates constraint satisfaction problems, backtracking algorithms, and combinatorial search in programming.