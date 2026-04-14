---
problemNumber: 89
title: "Roman numerals"
description: |
  For a number written in Roman numerals to be considered valid there are basic rules which must be followed. Even though the rules allow some numbers to be expressed in more than one way there is always a "best" way of writing a particular number.

  For example, it would appear that there are at least six ways of writing the number sixteen:

  ```
  IIIIIIIIIIIIIIII
  VIIIIIIIIIII
  VVIIIIII
  XIIIIII
  VVVI
  XVI
  ```

  However, according to the rules only `XIIIIII` and `XVI` are valid, and the last example is considered to be the most efficient, as it uses the least number of numerals.

  The 11K text file, [roman.txt](https://projecteuler.net/resources/documents/0089_roman.txt) (right click and 'Save Link/Target As...'), contains one thousand numbers written in valid, but not necessarily minimal, Roman numerals; see [About Roman Numerals](https://projecteuler.net/about=roman_numerals) for the definitive rules for this problem.

  Find the number of characters saved by writing each of these in their minimal form.

  **Note:** You can assume that all the Roman numerals in the file contain no more than four consecutive identical units.
difficulty: "medium"
date: "2024-04-12"
technologies: ["cpp", "go", "java", "javascript", "python", "rust"]
implementations:
  - language: "cpp"
    code: |
      #include <iostream>
      #include <fstream>
      #include <string>
      #include <vector>

      int roman_to_int(const std::string& s) {
          std::vector<std::pair<std::string, int>> values = {
              {"M", 1000}, {"CM", 900}, {"D", 500}, {"CD", 400},
              {"C", 100}, {"XC", 90}, {"L", 50}, {"XL", 40},
              {"X", 10}, {"IX", 9}, {"V", 5}, {"IV", 4}, {"I", 1}
          };
          int total = 0;
          size_t i = 0;
          while (i < s.length()) {
              bool found = false;
              for (const auto& p : values) {
                  if (s.substr(i, p.first.length()) == p.first) {
                      total += p.second;
                      i += p.first.length();
                      found = true;
                      break;
                  }
              }
              if (!found) i++;
          }
          return total;
      }

      std::string int_to_roman(int num) {
          std::vector<std::pair<int, std::string>> values = {
              {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
              {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
              {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"}
          };
          std::string result;
          for (const auto& p : values) {
              while (num >= p.first) {
                  result += p.second;
                  num -= p.first;
              }
          }
          return result;
      }

      long long roman_numerals() {
          std::ifstream file("src/p089_roman.txt");
          if (!file) return 0;
          std::string line;
          long long saved = 0;
          while (std::getline(file, line)) {
              if (line.empty()) continue;
              int value = roman_to_int(line);
              std::string minimal = int_to_roman(value);
              saved += line.length() - minimal.length();
          }
          return saved;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler089.cpp"
    performance: "~1ms"
  - language: "go"
    code: |
      package main

      import (
          "bufio"
          "os"
          "strconv"
          "strings"
      )

      func romanToInt(s string) int {
          values := []struct {
              rom string
              val int
          }{
              {"M", 1000}, {"CM", 900}, {"D", 500}, {"CD", 400},
              {"C", 100}, {"XC", 90}, {"L", 50}, {"XL", 40},
              {"X", 10}, {"IX", 9}, {"V", 5}, {"IV", 4}, {"I", 1},
          }
          total := 0
          i := 0
          for i < len(s) {
              found := false
              for _, p := range values {
                  if strings.HasPrefix(s[i:], p.rom) {
                      total += p.val
                      i += len(p.rom)
                      found = true
                      break
                  }
              }
              if !found {
                  i++
              }
          }
          return total
      }

      func intToRoman(num int) string {
          values := []struct {
              val int
              rom string
          }{
              {1000, "M"}, {900, "CM"}, {500, "D"}, {400, "CD"},
              {100, "C"}, {90, "XC"}, {50, "L"}, {40, "XL"},
              {10, "X"}, {9, "IX"}, {5, "V"}, {4, "IV"}, {1, "I"},
          }
          result := ""
          for _, p := range values {
              for num >= p.val {
                  result += p.rom
                  num -= p.val
              }
          }
          return result
      }

      func romanNumerals() int {
          file, err := os.Open("src/p089_roman.txt")
          if err != nil {
              return 0
          }
          defer file.Close()
          scanner := bufio.NewScanner(file)
          saved := 0
          for scanner.Scan() {
              line := strings.TrimSpace(scanner.Text())
              if line == "" {
                  continue
              }
              value := romanToInt(line)
              minimal := intToRoman(value)
              saved += len(line) - len(minimal)
          }
          return saved
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler089.cpp"
    performance: "~1ms"
  - language: "java"
    code: |
      import java.io.*;
      import java.util.*;

      public class Euler089 {
          static int romanToInt(String s) {
              List<Map.Entry<String, Integer>> values = Arrays.asList(
                  new AbstractMap.SimpleEntry<>("M", 1000),
                  new AbstractMap.SimpleEntry<>("CM", 900),
                  new AbstractMap.SimpleEntry<>("D", 500),
                  new AbstractMap.SimpleEntry<>("CD", 400),
                  new AbstractMap.SimpleEntry<>("C", 100),
                  new AbstractMap.SimpleEntry<>("XC", 90),
                  new AbstractMap.SimpleEntry<>("L", 50),
                  new AbstractMap.SimpleEntry<>("XL", 40),
                  new AbstractMap.SimpleEntry<>("X", 10),
                  new AbstractMap.SimpleEntry<>("IX", 9),
                  new AbstractMap.SimpleEntry<>("V", 5),
                  new AbstractMap.SimpleEntry<>("IV", 4),
                  new AbstractMap.SimpleEntry<>("I", 1)
              );
              int total = 0;
              int i = 0;
              while (i < s.length()) {
                  boolean found = false;
                  for (Map.Entry<String, Integer> p : values) {
                      if (s.startsWith(p.getKey(), i)) {
                          total += p.getValue();
                          i += p.getKey().length();
                          found = true;
                          break;
                      }
                  }
                  if (!found) i++;
              }
              return total;
          }

          static String intToRoman(int num) {
              List<Map.Entry<Integer, String>> values = Arrays.asList(
                  new AbstractMap.SimpleEntry<>(1000, "M"),
                  new AbstractMap.SimpleEntry<>(900, "CM"),
                  new AbstractMap.SimpleEntry<>(500, "D"),
                  new AbstractMap.SimpleEntry<>(400, "CD"),
                  new AbstractMap.SimpleEntry<>(100, "C"),
                  new AbstractMap.SimpleEntry<>(90, "XC"),
                  new AbstractMap.SimpleEntry<>(50, "L"),
                  new AbstractMap.SimpleEntry<>(40, "XL"),
                  new AbstractMap.SimpleEntry<>(10, "X"),
                  new AbstractMap.SimpleEntry<>(9, "IX"),
                  new AbstractMap.SimpleEntry<>(5, "V"),
                  new AbstractMap.SimpleEntry<>(4, "IV"),
                  new AbstractMap.SimpleEntry<>(1, "I")
              );
              StringBuilder result = new StringBuilder();
              for (Map.Entry<Integer, String> p : values) {
                  while (num >= p.getKey()) {
                      result.append(p.getValue());
                      num -= p.getKey();
                  }
              }
              return result.toString();
          }

          static long romanNumerals() {
              try (BufferedReader br = new BufferedReader(new FileReader("src/p089_roman.txt"))) {
                  String line;
                  long saved = 0;
                  while ((line = br.readLine()) != null) {
                      line = line.trim();
                      if (line.isEmpty()) continue;
                      int value = romanToInt(line);
                      String minimal = intToRoman(value);
                      saved += line.length() - minimal.length();
                  }
                  return saved;
              } catch (IOException e) {
                  return 0;
              }
          }
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/cpp/src/euler089.cpp"
    performance: "~1ms"
  - language: "javascript"
    code: |
      const fs = require('fs');

      function roman_to_int(s) {
        const values = [
          ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
          ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
          ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
        ];
        let total = 0;
        let i = 0;
        while (i < s.length) {
          let found = false;
          for (const [str, val] of values) {
            if (s.substr(i, str.length) === str) {
              total += val;
              i += str.length;
              found = true;
              break;
            }
          }
          if (!found) i++;
        }
        return total;
      }

      function int_to_roman(num) {
        const values = [
          [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
          [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
          [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
        ];
        let result = '';
        for (const [val, str] of values) {
          while (num >= val) {
            result += str;
            num -= val;
          }
        }
        return result;
      }

      function roman_numerals() {
        const data = fs.readFileSync('src/euler/p089_roman.txt', 'utf8');
        const lines = data.trim().split('\n');
        let saved = 0;
        for (const line of lines) {
          if (!line) continue;
          const value = roman_to_int(line);
          const minimal = int_to_roman(value);
          saved += line.length - minimal.length;
        }
        return saved;
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/javascript/src/euler/solution089.js"
    performance: "~10ms"
  - language: "python"
    code: |
      def roman_to_int(s):
          roman = {'I':1, 'V':5, 'X':10, 'L':50, 'C':100, 'D':500, 'M':1000}
          total = 0
          prev = 0
          for c in reversed(s):
              val = roman[c]
              if val < prev:
                  total -= val
              else:
                  total += val
              prev = val
          return total

      def int_to_roman(n):
          val = [1000,900,500,400,100,90,50,40,10,9,5,4,1]
          sym = ['M','CM','D','CD','C','XC','L','XL','X','IX','V','IV','I']
          roman = ''
          i = 0
          while n > 0:
              for _ in range(n // val[i]):
                  roman += sym[i]
                  n -= val[i]
              i += 1
          return roman

      def roman_numerals():
          saved = 0
          with open('../cpp/src/p089_roman.txt') as f:
              for line in f:
                  line = line.strip()
                  num = roman_to_int(line)
                  minimal = int_to_roman(num)
                  saved += len(line) - len(minimal)
          return saved
    githubLink: "https://github.com/tvarley/euler/blob/master/python/src/euler089.py"
    performance: "~1ms"
  - language: "rust"
    code: |
      pub fn roman_numerals() -> usize {
          let content = std::fs::read_to_string("../cpp/src/p089_roman.txt").unwrap();
          let mut saved = 0;
          for line in content.lines() {
              if line.is_empty() {
                  continue;
              }
              let value = roman_to_int(line);
              let minimal = int_to_roman(value);
              saved += line.len() - minimal.len();
          }
          saved
      }

      fn roman_to_int(s: &str) -> u32 {
          let values = vec![
              ("M", 1000), ("CM", 900), ("D", 500), ("CD", 400),
              ("C", 100), ("XC", 90), ("L", 50), ("XL", 40),
              ("X", 10), ("IX", 9), ("V", 5), ("IV", 4), ("I", 1)
          ];
          let mut total = 0;
          let mut i = 0;
          let chars: Vec<char> = s.chars().collect();
          while i < chars.len() {
              let mut found = false;
              for &(rom, val) in &values {
                  let rom_chars: Vec<char> = rom.chars().collect();
                  if i + rom_chars.len() <= chars.len() && chars[i..i + rom_chars.len()] == rom_chars {
                      total += val;
                      i += rom_chars.len();
                      found = true;
                      break;
                  }
              }
              if !found {
                  i += 1;
              }
          }
          total
      }

      fn int_to_roman(mut num: u32) -> String {
          let values = vec![
              (1000, "M"), (900, "CM"), (500, "D"), (400, "CD"),
              (100, "C"), (90, "XC"), (50, "L"), (40, "XL"),
              (10, "X"), (9, "IX"), (5, "V"), (4, "IV"), (1, "I")
          ];
          let mut result = String::new();
          for &(val, rom) in &values {
              while num >= val {
                  result.push_str(rom);
                  num -= val;
              }
          }
          result
      }
    githubLink: "https://github.com/tvarley/euler/blob/master/rust/src/euler089.rs"
    performance: "~1ms"
tags: ["roman numerals", "string parsing", "conversion"]
featured: false
showcase: false
---

## Solution Notes

### Mathematical Background
Roman numerals can be written in multiple valid forms, but each number has a minimal representation using the fewest characters. The problem involves parsing 1000 Roman numerals from a file and calculating the total character savings when converting them to their minimal forms.

### Algorithm Analysis
The solution uses two functions: one to convert Roman numerals to integers using a lookup table of symbol values, and another to convert integers back to minimal Roman numerals. For each numeral in the file, it computes the value, generates the minimal form, and accumulates the difference in lengths.

### Performance
All implementations are highly efficient, running in under 10ms due to the small input size (1000 lines) and simple lookup-based conversions.

### Key Insights
- The parsing handles subtractive notation (e.g., IV for 4) by checking for two-character combinations first.
- The minimal form generation uses greedy selection from largest to smallest values.

### Educational Value
This problem demonstrates string parsing techniques and the importance of canonical representations in numeral systems, providing insight into historical number notation.