package com.example.util;

import java.util.UUID;

public class Util {
    public static String uuid() {
        return UUID.randomUUID().toString().replace("-", "");
    }
}
