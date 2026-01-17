




```bash
[arthas@18883]$ trace com.li.service.impl.SimpleServiceImpl query
Press Q or Ctrl+C to abort.
Affect(class count: 1 , method count: 1) cost in 108 ms, listenerId: 1
`---ts=2025-02-20 11:41:43.977;thread_name=http-nio-10000-exec-1;id=31;is_daemon=true;priority=5;TCCL=org.springframework.boot.web.embedded.tomcat.TomcatEmbeddedWebappClassLoader@8deb645
    `---[1612.333758ms] com.li.service.impl.SimpleServiceImpl:query()
        +---[31.27% 504.240305ms ] com.li.service.impl.SimpleServiceImpl:sleep500() #16
        `---[6.47% 104.355554ms ] com.li.service.impl.SimpleServiceImpl:sleep100() #17
```