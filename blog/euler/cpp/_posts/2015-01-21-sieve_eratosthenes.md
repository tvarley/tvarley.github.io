---
layout:     post
title:      Sieve of Eratosthenes
date:       2015-01-21 11:28:00
summary:    Prime number sieve used by a few of my Euler c++ solutions.
categories: blog euler eratosthenes
comments:   true
permalink:  /blog/euler/cpp/sieve_eratosthenes
#published: false
#tags:      tag1
---

## Introduction

The sieve of Eratosthenes is a simple algorithm for finding all prime numbers up to a given limit.
It does so by iteratively marking as composite (i.e. not prime) the multiples of each prime,
starting with the multiples of 2.

## Source

### PDL

```
Let A be an array of Boolean values, indexed by integers 2 to n,
initially all set to true.

for i = 2, 3, 4, ..., not exceeding √n:
  if A[i] is true:
    for j = i2, i2+i, i2+2i, ..., not exceeding n :
      A[j] := false
```

Output: all i such that A[i] is true.


The implementation below was quickly put together to support a couple of my Euler c++ solutions. I include it here for
completeness.

_THERE HAS BEEN NO ATTEMPT TO OPTIMIZE THE CODE BELOW_

See: [http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes](http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes)


### Header

``` cpp
#if ! defined SIEVE_ERATOS_INCLUDED
#define SIEVE_ERATOS_INCLUDED

#include <vector>
#include <cmath>

class CSieveOfEratosthenes
{
public:
  CSieveOfEratosthenes(int a_upper = 0) : m_upper(a_upper), m_primes(nullptr)
  {
    init();
  }

  virtual ~CSieveOfEratosthenes()
  {
    delete m_primes;
  }

  int get_nth(int a_pos)
  {
    int value = 0;
    int count = a_pos;
    size_t i = 0;
    for ( i = 0; i < m_primes->size() && a_pos ; i++) {
      // cout << "O: " << i << endl;
      if( true == (*m_primes)[i] ){
        // cout << "    **" << endl;
        value = i;
        a_pos--;
      }
    }

    if( a_pos == 0 ){
      return value;
    }else{
      return 0;
    }
  }

  uint64_t sum(int a_max)
  {
    uint64_t total = 0;
    size_t i;
    for( i = 0; i < a_max ; i++){
      if( true == (*m_primes)[i]){
        total += i;
      }
    }
    return total;
  }

  void dump(void);

protected:
  void init()
  {
    delete m_primes;

    if( m_upper <= 0 ){
      return;
    }

    int sqrtupper = (int)floor(sqrt(m_upper));

    m_primes = new std::vector<bool>(m_upper,true);

    (*m_primes)[0] = false;
    (*m_primes)[1] = false;

    for (size_t i = 2; i <= sqrtupper ; i++ ) {
      // cout << "O:" << i << endl;
      if( true == (*m_primes)[i]){
        for (size_t j = (i*i); j < m_upper; j += i ) {
          // cout << "    I:" << j << endl;
          (*m_primes)[j] = false;
        }
      }
    }
  }

private:
  int m_upper;
  std::vector<bool>*  m_primes;
};


#endif // SIEVE_ERATOS_INCLUDED
```

## See Also

* [Euler Introduction]({{site.baseurl}}/blog/euler/introduction)
* [My Euler Repo](https://github.com/tvarley/euler) :octocat:
