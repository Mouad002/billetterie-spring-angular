package com.example.billetteriebackend.helpers;

import com.example.billetteriebackend.exceptions.StringToEnumConversionException;

public class StringToEnumConverter<T extends Enum<T>> {
    private final Class<T> enumType;

    public StringToEnumConverter(Class<T> enumType) {
        this.enumType = enumType;
    }

    public T convert(String source) throws StringToEnumConversionException {
        if (source == null || source.isEmpty()) {
            throw new StringToEnumConversionException("unable to convert string to enum because it's null or empty");
        }
        try {
            return Enum.valueOf(enumType, source.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new StringToEnumConversionException("can't convert {"+source+"} to Enum {"+ enumType.getName()+"}");
        }
    }
}
