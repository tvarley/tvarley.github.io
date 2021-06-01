---
layout:     post
title:      Simple c++ Timer
date:       2021-06-01 12:25:00
summary:    Simple timer used in some of my unittests
categories: blog euler simple_timer
comments:   true
permalink:  /blog/euler/cpp/simple_timer
#published: false
#tags:      tag1
---

### Header

{% highlight cpp %}
#if ! defined SIMPLE_TIMER_INCLUDED_DEFINED
#define SIMPLE_TIMER_INCLUDED_DEFINED

#include <atomic>
#include <chrono>
#include <iostream>

class simple_timer 
{
  std::string message;
  std::chrono::high_resolution_clock::time_point start_point;
  public:
    simple_timer(const std::string& msg) : message(msg), 
                                           start_point(std::chrono::high_resolution_clock::now()) {}
    ~simple_timer() {
      stop(false);
    }
    double stop(bool output = false)
    {
      std::atomic_thread_fence(std::memory_order_relaxed);
      auto end_point = std::chrono::high_resolution_clock::now();
      std::atomic_thread_fence(std::memory_order_relaxed);
      double counted_time = std::chrono::duration_cast<std::chrono::microseconds>(end_point - start_point).count();
      if(true == output) {
        std::cout << message << ": " << counted_time << "μs (" << counted_time / 1000000 << ")" << std::endl;
      }
      return counted_time;
    }
};

#endif // SIMPLE_TIMER_INCLUDED_DEFINED
{% endhighlight %}

{% include suffix.html %}
